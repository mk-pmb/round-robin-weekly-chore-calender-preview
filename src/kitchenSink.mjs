function fail(m, a) { throw Object.assign(new Error(m), a); }
function ores(x) { return x || ''; }
function orf(x) { return x || false; }
function words(x) { return String(x || '').match(/\S+/g) || []; }


const EX = {

  fail,
  ores,
  orf,
  words,

  monthNamesShort: words('Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec'),
  weekdayNamesShort: words('Mon Tue Wed Thu Fri Sat Sun'),

};


export default EX;
