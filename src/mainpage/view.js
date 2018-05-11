'use-strict';

const crel = require('crel');
const TWEEN = require('@tweenjs/tween.js');
const EventEmitter = require('events').EventEmitter;
const domHelper = require('../helpers/dom-helper');
const dataHelper = require('../helpers/data-helper');

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
    const seenClass = dataHelper.get(item, 'seen') ? 'seen' : 'not-seen';

    return crel(
      'div',
      { class: 'item-button-container' },
      this._createButton(item, 'icon-play', this._onItemPlayClick),
      this._createButton(item, 'icon-see', this._onItemSeeClick, seenClass),
    );
  }

  _createButton(item, icon, onclick, buttonClass = '') {
    const button = crel(
      'button', { class: buttonClass },
      crel('i', { class: icon }),
    );
    button.addEventListener('click', evt => onclick.call(this, item, evt, button));
    return button;
  }

  _onItemPlayClick(item) {
    this.emit('play-item', item);
  }

  _onItemSeeClick(item, evt, button) {
    this.emit('toggle-see-item', item);
    if (button.classList.contains('seen')) {
      button.classList.remove('seen');
      button.classList.add('not-seen');
    } else {
      button.classList.add('seen');
      button.classList.remove('not-seen');
    }
  }

  _onPodcastClick(podcast) {
    if (this.itemsContainer.childElementCount === 0) {
      MainView._animate(this.itemsContainer, { expand: true });
    }
    if (this.previousClicked === podcast && this.itemsContainer.childElementCount) {
      MainView._animate(
        this.itemsContainer,
        { expand: false, onComplete: () => domHelper._cleanContainer(this.itemsContainer) },
      );
    } else {
      this.createItemList(podcast.item);
    }
    this.previousClicked = podcast;
  }

  static _animate(element, options = {}) {
    const { expand, onComplete } = Object.assign({ expand: true, onComplete: () => {} }, options);
    if (expand) {
      values.height = 0;
      new TWEEN.Tween(values)
        .to({ height: 100 }, 1000)
        .easing(TWEEN.Easing.Cubic.Out)
        .onUpdate(() => {
          element.style.height = `${values.height}%`;
        })
        .onComplete(onComplete)
        .start();
    } else {
      values.height = 100;
      new TWEEN.Tween(values)
        .to({ height: 0 }, 1000)
        .easing(TWEEN.Easing.Cubic.Out)
        .onUpdate(() => {
          element.style.height = `${values.height}%`;
        })
        .onComplete(onComplete.bind(this))
        .start();
    }
  }
}

module.exports = MainView;
