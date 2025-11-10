import qrystr from 'qrystr';

import colorPalettes from './colorPalettes.mjs';
import du from './domUtil.mjs';
import kisi from './kitchenSink.mjs';


const { defaultColorPaletteName } = colorPalettes;
const { orf, words } = kisi;


const EX = {

  palColors: du.getOrAppendElementById('pal-colors', 'input'),

  palSkips: du.getOrAppendElementById('pal-skips', 'p', {
    onclick(evt) {
      du.win.palSkipsClicked = evt;
    },
  }),


  loadConfig() {
    const qry = qrystr(du.win.location.hash);

    let { colors } = qry;
    if (colors && colors.match) { colors = colors.match(/[#\w]+/g); }
    if (!orf(colors).length) { colors = defaultColorPaletteName; }
    EX.palColors.value = colors.join(' ');
    colors.forEach(EX.addPalSkipColor);

    EX.palSkips.innerHTML = '';
    const skips = words(qry.skips).map(x => orf(+x)).filter(Boolean);
    skips.forEach(function setSkip(nth) {
      const label = EX.palSkips.children[nth - 1];
      if (label) { label.ckb.checked = true; }
    });
  },


  addPalSkipColor(c) {
    const pal = colorPalettes.get(c);
    if (pal) { return pal.forEach(EX.addPalSkipColor); }
    const label = du.addElem(EX.palSkips, 'label', 'pal-skip');
    label.nth = EX.palSkips.children.length;
    label.ckb = du.addElem(label, 'input');
    label.ckb.type = 'checkbox';
    label.style.backgroundColor = c;
    return label;
  },


};


export default EX;
