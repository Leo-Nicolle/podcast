const queryJson = require('query-json');
const generateDom = require('generate-dom');

module.exports = {
  search: document.getElementById('search'),
  podcasts: [],

  init(podcasts) {
    this.search.addEventListener('change', () => this.searchIntoPodcasts());
    this.podcasts = podcasts;
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
    const nonAccentQuery = this._removeAccents(this.search.value);
    const regExp = new RegExp(`${nonAccentQuery}`, 'i');
    const results = this.podcasts
      .reduce(
        (allResults, podcast) =>
          allResults.concat(podcast.rss.channel[0].item.reduce((podcastResult, item) => {
            const score = scores
              .reduce((total, { key, weight }) =>
                total + (this._removeAccents(item[key][0]).match(regExp) ? weight : 0), 0);
            if (score === 0) return podcastResult;
            return podcastResult.concat(item);
          }, []))
        , [],
      );
  },

  _removeAccents(str) {
    return str.normalize('NFC').replace(/[\u0300-\u036f]/g, '');
  },

};
