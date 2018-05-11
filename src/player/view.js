'use-strict';

const crel = require('crel');
const domHelper = require('../dom-helper');

class PlayerView {
  constructor() {
    this.podcastPlayer = document.getElementById('podcast-player');
    this.trackTitle = document.getElementById('track-title');
  }

  _onPlayItem(item) {
    domHelper._cleanContainer(this.podcastPlayer);
    crel(this.podcastPlayer, crel(
      'source',
      { src: item.guid },
    ));
    this.trackTitle.innerText = item.title;
  }
}

module.exports = PlayerView;
