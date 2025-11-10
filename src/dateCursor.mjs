const EX = function makeDateCursor() {
  const dc = new Date();
  dc.setHours(12);
  Object.assign(dc, EX.api);
  return dc;
};

EX.api = {
  daysOffset: 0,
  daysSinceMonday() { return (this.getDay() + 6) % 7; },

  addDays(days) {
    const dc = this;
    if (!Number.isFinite(days)) { return dc; }
    dc.setHours(dc.getHours() + (24 * days));
    dc.daysOffset += days;
    dc.updateUtilityProps();
    return dc;
  },

  updateUtilityProps() {
    const dc = this;
    dc.monthEvenOrOdd = ((dc.getMonth() % 2)
      ? 'even' : 'odd'); // swapped because JS Date months start at 0
    dc.monthEvenOrOddCls = dc.monthEvenOrOdd + '-month';
    return dc;
  },

};


export default EX;
