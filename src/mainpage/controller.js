'use-strict';

const MainView = require('./view');
const Query = require('./query');
const dataHelper = require('../helpers/data-helper');


class MainPage {
  constructor(allRss) {
    this.view = new MainView();
    this.query = new Query(allRss, this.view);
    allRss.forEach((rss) => {
      this.view.createPodcastList([rss.rss.channel[0]]);
    });
    this.view.on('toggle-see-item', item => MainPage._onToggleSeeItem(item));
  }

  static _onToggleSeeItem(item) {
    dataHelper.set(item, 'seen', !dataHelper.set(item, 'seen'));
  }
}

module.exports = MainPage;
