'use-strict';

const crel = require('crel');

module.exports = {

  itemsContainer: document.getElementById('items-container'),
  podcastsContainer: document.getElementById('podcasts-container'),
  podcastPlayer: document.getElementById('podcast-player'),

  createPodcastList(podcasts) {
    crel(
      this.podcastsContainer,
      podcasts.map(podcast =>
        crel(
          'div',
          { onclick: () => this._onPodcastClick(podcast) },
          crel('img', { src: podcast.image[0].url }),
          crel('p', podcast.title),
        )),
    );
  },

  createItemList(items) {
    this._cleanItemsContainer();
    crel(
      this.itemsContainer,
      this._createItemsUl(items),
    );
  },

  _createItemsUl(items) {
    return crel(
      'ul',
      { class: 'item-list' },
      items.map(item =>
        crel(
          'li',
          // { onclick: () => this._onItemClick(item) },
          crel('p', { class: 'item-title' }, item.title),
          ...this._createDescription(item.description[0]),
          this._createInteraction(item),
        )),
    );
  },

  _createResultList(results) {
    this._cleanItemsContainer();

    crel(
      this.itemsContainer,
      results.map(({ podcast, items }) =>
        crel(
          'div',
          crel(
            'div',
            crel('img', { src: podcast.image[0].url }),
            crel('p', { class: 'podcast-name' }, `${podcast.title} (${items.length} résultats)`),
          ),
          crel('ul'),
          this._createItemsUl(items),
        )),
    );
  },

  _cleanItemsContainer() {
    while (this.itemsContainer.childElementCount) {
      this.itemsContainer.removeChild(this.itemsContainer.firstChild);
    }
  },

  _createDescription(description) {
    if (!description) return [];
    const strings = description.split('-');
    if (strings.length >= 3) {
      return [
        crel('p', { class: 'item-description' }, strings.slice(3).join(' ')),
        crel('p', { class: 'item-duration' }, strings[0]),
      ];
    }
    return [
      crel('p', { class: 'item-description' }, description),
    ];
  },

  _createInteraction(item) {
    return crel(
      'div',
      { class: 'item-button-container' },
      this._createButton(item, 'icon-play', this._onItemPlayClick),
      this._createButton(item, 'icon-see', this._onItemSeeClick),
    );
  },

  _createButton(item, icon, onclick) {
    return crel(
      'button', { onclick: onclick.bind(this, item) },
      crel('i', { class: icon }),
    );
  },

  _onItemPlayClick(item) {
    this.podcastPlayer.pause();
    this.podcastPlayer.src = item.guid;
    this.podcastPlayer.play();
  },

  _onItemSeeClick(item) {

  },

  _onPodcastClick(podcast) {
    this.createItemList(podcast.item);
  },

};
