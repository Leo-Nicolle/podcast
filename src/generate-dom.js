'use-strict';

const crel = require('crel');
const TWEEN = require('@tweenjs/tween.js');

window.TWEEN = TWEEN;
window.itemsContainer = document.getElementById('items-container');
const values = { height: 100 };
module.exports = {

  itemsContainer: document.getElementById('items-container'),
  podcastsContainer: document.getElementById('podcasts-container'),
  podcastPlayer: document.getElementById('podcast-player'),
  trackTitle: document.getElementById('track-title'),


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
    this._cleanContainer(this.itemsContainer);
    crel(
      this.itemsContainer,
      this._createItemsUl(items),
    );
  },

  _createItemsUl(items) {
    values.height = 1;

    return crel(
      'ul',
      { class: 'item-list' },
      items.map(item =>
        crel(
          'li',
          crel('p', { class: 'item-title' }, item.title),
          ...this._createDescription(item.description[0]),
          this._createInteraction(item),
        )),
    );
  },

  _createResultList(results) {
    if (!this.itemsContainer.childElementCount) {
      this._animate(true, this.itemsContainer);
    }

    this._cleanContainer(this.itemsContainer);
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

  _cleanContainer(container) {
    if (!container) return;
    while (container.childElementCount) {
      container.removeChild(this.itemsContainer.firstChild);
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
    this._cleanContainer(this.podcastPlayer);
    crel(this.podcastPlayer, crel(
      'source',
      { src: item.guid },
    ));
    this.podcastPlayer.play();
    this.trackTitle.innerText = item.title;
  },

  _onItemSeeClick(item) {

  },

  _onPodcastClick(podcast) {
    if (this.itemsContainer.childElementCount === 0) {
      this._animate(true, this.itemsContainer);
    }
    this.createItemList(podcast.item);
  },

  _animate(expand, element) {
    if (expand) {
      values.height = 0;
      new TWEEN.Tween(values)
        .to({ height: 100 }, 2000)
        .easing(TWEEN.Easing.Cubic.Out)
        .onUpdate(() => {
          element.style.height = `${values.height}%`;
        })
        .start();
    } else {
      values.height = 100;
      new TWEEN.Tween(values)
        .to({ height: 0 }, 2000)
        .easing(TWEEN.Easing.Cubic.Out)
        .onUpdate(() => {
          element.style.height = `${values.height}%`;
        })
        .start();
    }
  },


};
