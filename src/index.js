const readPodcast = require('./read-podcast');

const generateDom = require('./generate-dom');


readPodcast.readPodcasts(
  [
    'http://localhost:3000/file.xml',
    'http://localhost:3000/file2.xml',
    'http://localhost:3000/file2.xml',
    'http://localhost:3000/file2.xml',
    'http://localhost:3000/file2.xml',
    'http://localhost:3000/file2.xml',
    'http://localhost:3000/file2.xml',
    'http://localhost:3000/file2.xml',
    'http://localhost:3000/file2.xml',
    'http://localhost:3000/file2.xml',
    'http://localhost:3000/file2.xml',


    // 'http://radiofrance-podcast.net/podcast09/rss_10076.xml',
    // 'http://radiofrance-podcast.net/podcast09/rss_13940.xml',
  ]
  , ((rss) => {
    generateDom.createPodcastList([rss.rss.channel[0]]);
  }),
);
