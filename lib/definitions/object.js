'use strict';

let define = require('../define');
let _ = require('../utils');
let DigsInitValidator = require('./init-validator');

const validator = DigsInitValidator.validator;

const DigsObject = define({
  init(context) {
    const digs = _.first(context.args);
    const appSettings = digs.settings.app;
    this.namespace = appSettings.namespace;
    this.project = appSettings.project;
    this._digs = digs;
  }
})
  .compose(DigsInitValidator)
  .validateInit(validator.array()
    .ordered(validator.object({
      settings: validator.object({
        app: validator.object({
          namespace: validator.string().required(),
          project: validator.string().required()
        }).required()
      }).required()
    }))
      .min(1));

module.exports = DigsObject;