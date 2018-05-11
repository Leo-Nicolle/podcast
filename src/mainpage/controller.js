'use-strict';

const MainView = require('./view');
const Query = require('./query');


class MainPage {
  constructor(allRss) {
    this.view = new MainView();
    this.query = new Query(allRss, this.view);
    allRss.forEach((rss) => {
      this.view.createPodcastList([rss.rss.channel[0]]);
    });
  }
}

module.exports = MainPage;
