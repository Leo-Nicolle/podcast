'use-strict';

const request = require('request-promise-lite');
const parseString = require('xml2js').parseString;


module.exports = {

  readPodcasts(urls, callback) {
    return urls.map(url => this.readPodcast(url, callback));
  },
  readPodcast(url, callback) {
    return request.get(url, { xml: true })
      .then((xml) => {
        parseString(xml, (err, result) => callback(result));
        return Promise.resolve(1);
      });
  },
};
