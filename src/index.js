const readPodcast = require('./read-podcast');

const generateDom = require('./generate-dom');
const query = require('./query');

const allRss = [];

window.query = query;

Promise.all(readPodcast.readPodcasts(
  [
    'http://localhost:3000/xml-podcasts/file.xml',
    'http://localhost:3000/xml-podcasts/file2.xml',

    // 'http://radiofrance-podcast.net/podcast09/rss_10076.xml',
    // 'http://radiofrance-podcast.net/podcast09/rss_13940.xml',
  ]
  , ((rss) => {
    allRss.push(rss);
  }),
)).then(() => {
  query.init(allRss);
  allRss.forEach((rss) => {
    generateDom.createPodcastList([rss.rss.channel[0]]);
  });
});
