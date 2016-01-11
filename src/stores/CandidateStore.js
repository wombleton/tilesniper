const dispatcher = require('../core/Dispatcher');
const EventEmitter = require('eventemitter3');

class CandidateStore {
  constructor (props) {
    this.items = [];
    this._key = 0;
    this.bus = new EventEmitter();
  }

  list () {
    return this.items;
  }

  add (item) {
    item.key = ++this._key;
    this.items.push(item);
    this.bus.emit('change');
  }
}

const store = new CandidateStore();

dispatcher.register((payload) => {
  switch (payload.eventName) {
    case 'candidate':
      store.add(payload.item);
      break;
  }

  return true;
});

export default store;
