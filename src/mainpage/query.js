
class Query {
  constructor(rss, view) {
    this.rss = rss;
    this.view = view;

    this.searchField = document.getElementById('search');
    this.searchButton = document.getElementById('search-button');
    this.searchField.addEventListener('change', () => this.searchIntoPodcasts());
    this.searchButton.addEventListener('click', () => this.searchIntoPodcasts());
  }

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
    const nonAccentQuery = Query
      ._removeAccents(this.searchField.value)
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
                total + (Query._removeAccents(item[key][0]).match(regExp) ? weight : 0), 0);
            if (score === 0) return podcastResult;
            return podcastResult.concat(item);
          }, []),
        }), [])
      .filter(elt => elt.items.length);

    this.view._createResultList(results);
  }

  static _removeAccents(str) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }
}
module.exports = Query;
