'use-strict';

const PlayerView = require('./view');
const dataHelper = require('../helpers/data-helper');

class Player {
  constructor(mainview) {
    // mainview.on('play-item', (...item) => constole.log()this._onPlayItem(item));
    this.podcastPlayer = document.getElementById('podcast-player');
    this.trackTitle = document.getElementById('track-title');
    this.podcastPlayer.addEventListener('timeupdate', () => this._onTimeUpdate());
    this.playerView = new PlayerView();
  }

  _onPlayItem(item) {
    this.podcastPlayer.pause();

    this.item = item;
    this.podcastPlayer.currentTime = dataHelper.get(item, 'currentTime');
    this.podcastPlayer.play();
    this.playerView._onPlayItem(item);
  }

  _onTimeUpdate() {
    if (!this.item) return;
    const current = this.podcastPlayer.currentTime;
    if (Math.abs(current - dataHelper.get(this.item, 'currentTime')) < 5) return;
    this.item._podcastData.currentTime = current;
    dataHelper.set(this.item, 'currentTime', current);
  }
}

module.exports = Player;
