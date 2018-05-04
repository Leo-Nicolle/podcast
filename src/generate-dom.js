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
    while (this.itemsContainer.childElementCount) {
      this.itemsContainer.removeChild(this.itemsContainer.firstChild);
    }
    crel(
      this.itemsContainer,
      crel(
        'ul',
        { class: 'item-list' },
        items.map(item =>
          crel(
            'li',
            { onclick: () => this._onItemClick(item) },
            crel('p', { class: 'item-title' }, item.title),
            ...this._createDescription(item.description[0]),
          )),
      ),
    );
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

  },

  _onItemClick(item) {
    this.podcastPlayer.src = item.guid;
    this.podcastPlayer.play();
  },

  _onPodcastClick(podcast) {
    this.createItemList(podcast.item);
  },

};
