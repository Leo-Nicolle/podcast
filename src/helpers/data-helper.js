'use-strict';

module.exports = {

  get(item, key) {
    this._createIfUndefined(item);
    if (item._podcastData[key] === undefined) {
      console.warn('trying to use an unset podcastData key: ', key);
    }
    return item._podcastData[key];
  },
  set(item, key, value) {
    this._createIfUndefined(item);
    item._podcastData[key] = value;
  },

  _createIfUndefined(item) {
    if (item._podcastData !== undefined) return;
    item._podcastData = {
      currentTime: 0,
      seen: false,
    };
  },
};
