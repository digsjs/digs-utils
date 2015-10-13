'use strict';

let define = require('../define');
let DigsObject = require('./object');
let chalk = require('chalk');
let _ = require('../utils');

const DigsLogger = define({
  refs: {
    colors: {
      debug: 'black',
      ok: 'green',
      error: 'red',
      info: 'blue',
      warn: 'yellow'
    }
  },
  init() {
    const logMethods = _.mapValues(this.colors,
      (color, methodName) => {
        return (data, tags) => {
          return this.log(chalk[color](data), [methodName].concat(tags || []));
        };
      });
    return _.extend(this, logMethods);
  },
  methods: {
    log(data, tags) {
      if (!arguments.length) {
        return;
      }
      tags = [
        this.namespace,
        this.project
      ].concat(tags || []);
      this._digs.log(tags, data);
    }
  }
})
  .compose(DigsObject);

module.exports = DigsLogger;