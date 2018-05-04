const queryJson = require('query-json');
const generateDom = require('./generate-dom');

module.exports = {
  search: document.getElementById('search'),
  rss: [],

  init(rss) {
    this.search.addEventListener('change', () => this.searchIntoPodcasts());
    this.rss = rss;
  },

  searchIntoPodcasts() {
    const scores = [
      {
        key: 'title',
        weight: 5,
      },
      {
        key: 'description',
        weight: 3,
      },
    ];
    const nonAccentQuery = this
      ._removeAccents(this.search.value)
      .split(' ')
      .filter(s => s.length > 1)
      .join('&');
    const regExp = new RegExp(`${nonAccentQuery}`, 'i');
    const results = this.rss
      .reduce((allResults, podcast) =>
        allResults.concat({
          podcast: podcast.rss.channel[0],
          items: podcast.rss.channel[0].item.reduce((podcastResult, item) => {
            const score = scores
              .reduce((total, { key, weight }) =>
                total + (this._removeAccents(item[key][0]).match(regExp) ? weight : 0), 0);
            if (score === 0) return podcastResult;
            return podcastResult.concat(item);
          }, []),
        }), [])
      .filter(elt => elt.items.length);

    generateDom._createResultList(results);
  },

  _removeAccents(str) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  },

};
