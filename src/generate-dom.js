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

  createItemList(items,options) {
    while (this.itemsContainer.childElementCount) {
      this.itemsContainer.removeChild(this.itemsContainer.firstChild);
    }

    crel(
      this.itemsContainer,
      crel(
        'ul',
        { class: 'item-list' },
        items.map(item => this._createItemLi(item, options)
      ),
    );
  },

  _createItemLi(item, { displayPodcastImage = false, displayPodcastName = false, podcast = {} }) {
    return crel(
      'li',
      { onclick: () => this._onItemClick(item) },
      this._createNameItem(displayPodcastName && podcast),

      crel('p', { class: 'item-title' }, item.title),
      this._createImageItem(displayPodcastImage && podcast),
      ...this._createDescription(item.description[0]),
    ))
    .filter(elt => elt);
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

  _createImageItem(podcast) {
    return podcast && crel('img', {
      src: podcast.image[0].url,
    });
  },

  _createNameItem(podcast) {
    return podcast && crel('p', {
      class: 'item-podcast-name',
    }, podcast.title);
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
