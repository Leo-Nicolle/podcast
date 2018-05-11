'use-strict';

const crel = require('crel');
const TWEEN = require('@tweenjs/tween.js');
const EventEmitter = require('events').EventEmitter;
const domHelper = require('../dom-helper');

const values = { height: 100 };

class MainView extends EventEmitter {
  constructor() {
    super();
    this.prototype = new EventEmitter();
    this.itemsContainer = document.getElementById('items-container');
    this.podcastsContainer = document.getElementById('podcasts-container');
  }


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
  }

  createItemList(items) {
    domHelper._cleanContainer(this.itemsContainer);
    crel(
      this.itemsContainer,
      this._createItemsUl(items),
    );
  }

  _createItemsUl(items) {
    values.height = 1;

    return crel(
      'ul',
      { class: 'item-list' },
      items.map(item =>
        crel(
          'li',
          crel('p', { class: 'item-title' }, item.title),
          ...MainView._createDescription(item.description[0]),
          this._createInteraction(item),
        )),
    );
  }

  _createResultList(results) {
    if (!this.itemsContainer.childElementCount) {
      MainView._animate(true, this.itemsContainer);
    }

    domHelper._cleanContainer(this.itemsContainer);
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
  }

  static _createDescription(description) {
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
  }

  _createInteraction(item) {
    return crel(
      'div',
      { class: 'item-button-container' },
      this._createButton(item, 'icon-play', this._onItemPlayClick),
      // this._createButton(item, 'icon-see', Veiw._onItemSeeClick),
    );
  }

  _createButton(item, icon, onclick) {
    return crel(
      'button', { onclick: onclick.bind(this, item) },
      crel('i', { class: icon }),
    );
  }

  _onItemPlayClick(item) {
    this.emit('play-item', item);
  }

  static _onItemSeeClick(item) {

  }

  _onPodcastClick(podcast) {
    if (this.itemsContainer.childElementCount === 0) {
      MainView._animate(true, this.itemsContainer);
    }
    this.createItemList(podcast.item);
  }

  static _animate(expand, element) {
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
  }
}

module.exports = MainView;
