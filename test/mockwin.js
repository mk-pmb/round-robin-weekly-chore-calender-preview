'use strict';

const jsdom = require('jsdom');

const dom = new jsdom.JSDOM('<!DOCTYPE html><html><body></body></html>');
const win = dom.window;

module.exports = Object.bind(null, win);
