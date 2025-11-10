'use strict';

require('p-fatal');
require('usnam-pmb');

require('esbrowserify-pmb/fx/simpleFromManifest.js')(require, {
  mainFile: './_autorun.mjs',
});
