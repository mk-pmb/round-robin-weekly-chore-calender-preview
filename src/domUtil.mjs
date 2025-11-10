import kisi from './kitchenSink.mjs';

const { orf } = kisi;

const du = {};

Object.assign(du, {

  dynCss: 'NEEDS_WINDOW',


  setWindow(w) {
    if (!w) { return; }
    if (w === du.win) { return; }
    du.win = w;
    du.dynCss = du.getOrAppendElementById('dyn-css', 'style',
      { parentNode: du.win.document.head, type: 'text/css', innerHTML: '\n' });
  },


  getOrAppendElementById(idCls, tag, opt) {
    const el = (du.win.document.getElementById(idCls)
      || du.win.document.createElement(tag));
    const { parentNode, ...props } = orf(opt);
    if (!el.id) { (parentNode || du.win.document.body).appendChild(el); }
    el.id = idCls;
    el.className = idCls;
    Object.assign(el, props);
    return el;
  },


  addElem(parent, tag, cls) {
    const el = du.win.document.createElement(tag);
    if (cls) { el.className = cls; }
    if (tag === 'td') { el.p = du.addElem(el, 'p'); }
    parent.appendChild(el);
    return el;
  },


  p(cell, html) {
    const { p } = cell;
    p.innerHTML = html;
    return p;
  },


});


du.setWindow((typeof window === 'object') && window);

export default du;
