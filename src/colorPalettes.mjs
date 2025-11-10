import du from './domUtil.mjs';
import kisi from './kitchenSink.mjs';


const EX = Object.assign(new Map(), {

  defaultColorPaletteName: 'rainbow',

  mustGet(palName) {
    return EX.get(palName) || kisi.fail('Unknown color palette: ' + palName);
  },

  registerBgColors(palName, cssNamePrefix) {
    du.dynCss.innerHTML += EX.mustGet(palName).map(function fmt(color, index) {
      return ('  .' + cssNamePrefix + '-' + index
        + ' { background-color: color-mix(in srgb, ' + color
        + ' var(--' + cssNamePrefix + '-opct), transparent); }');
    }).concat('').join('\n  ');
  },


});


export default EX;
