'use-strict';

module.exports = {

  _cleanContainer(container) {
    if (!container) return;
    while (container.childElementCount) {
      container.removeChild(container.firstChild);
    }
  },
};
