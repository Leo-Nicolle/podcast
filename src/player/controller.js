'use-strict';

const PlayerView = require('./view');

class Player {
  constructor(mainview) {
    mainview.on('play-item', item => this._onPlayItem(item));
    this.podcastPlayer = document.getElementById('podcast-player');
    this.trackTitle = document.getElementById('track-title');
    this.podcastPlayer.addEventListener('timeupdate', () => this._onTimeUpdate());
    this.playerView = new PlayerView();
  }

  _onPlayItem(item) {
    this.podcastPlayer.pause();
    if (!item._podcastData) {
      item._podcastData = {
        currentTime: 0,
      };
    }
    this.item = item;
    this.podcastPlayer.currentTime = item._podcastData.currentTime;
    this.podcastPlayer.play();
    this.playerView._onPlayItem(item);
  }

  _onTimeUpdate() {
    if (!this.item) return;
    const current = this.podcastPlayer.currentTime;
    if (Math.abs(current - this.item._podcastData.currentTime) < 5) return;
    this.item._podcastData.currentTime = current;
  }
}

module.exports = Player;
