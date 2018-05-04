'use-strict';

const request = require('request-promise-lite');
const parseString = require('xml2js').parseString;


module.exports = {

  readPodcasts(urls, callback) {
    urls.forEach(url => this.readPodcast(url, callback));
  },
  readPodcast(url, callback) {
    request.get(url, { xml: true })
      .then((xml) => {
        parseString(xml, (err, result) => callback(result));
      });
  },
};
