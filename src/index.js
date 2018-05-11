const readPodcast = require('./read-podcast');
const Player = require('./player/controller');
const MainPage = require('./mainpage/controller');

const TWEEN = require('@tweenjs/tween.js');


function animate(time) {
  requestAnimationFrame(animate);
  TWEEN.update(time);
}
animate();

const allRss = [];
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
  const mainPage = new MainPage(allRss);
  const player = new Player(mainPage.view);
});
