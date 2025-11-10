import colorPalettes from './colorPalettes.mjs';
import du from './domUtil.mjs';
import kisi from './kitchenSink.mjs';
import makeDateCursor from './dateCursor.mjs';

import './cpal.rainbow.mjs';


const EX = {

  minWeeks: 30,


  install(win) {
    du.setWindow(win);
    colorPalettes.registerBgColors('rainbow', 'rbbg');

    const dateCursor = makeDateCursor();
    dateCursor.addDays(-dateCursor.daysSinceMonday(dateCursor));
    dateCursor.voidDaysWithDateLowerThan = 0; // initially, render all days.

    const table = du.getOrAppendElementById('cal-table', 'table');
    table.headers = du.addElem(table, 'tr', 'headers');
    du.addElem(table.headers, 'td', 'topleft invisi');
    kisi.weekdayNamesShort.forEach(function addWeekdayRow(wdn, wdIdx) {
      const row = du.addElem(table, 'tr', 'days');
      row.className += ' ' + wdn.toLowerCase();
      const dayName = du.addElem(row, 'td', 'weekdayname');
      const p = du.p(dayName, wdn);
      p.className = 'rbbg-' + wdIdx;
    });
    for (let weekOffset = 0; weekOffset < EX.minWeeks; weekOffset += 1) {
      EX.renderWeekdayCol(table, dateCursor);
    }
    if (dateCursor.getDate() >= 2) {
      // If we're partially into a month, complete that month.
      dateCursor.voidDaysWithDateLowerThan = dateCursor.getDate();
      while (dateCursor.voidDaysWithDateLowerThan < 9000) {
        EX.renderWeekdayCol(table, dateCursor);
      }
      delete dateCursor.voidDaysWithDateLowerThan;
    }
  },


  renderWeekdayCol(table, dateCursor) {
    const [monthHeadRow, ...dayRows] = Array.from(table.children);
    const previousLastMonthHead = monthHeadRow.lastElementChild;
    dayRows.forEach(function renderDay(wkdRow) {
      EX.renderOneDayCell(monthHeadRow, wkdRow, dateCursor);
      dateCursor.addDays(1);
    });
    if (monthHeadRow.lastElementChild === previousLastMonthHead) {
      previousLastMonthHead.setAttribute('colspan',
        (+previousLastMonthHead.getAttribute('colspan') || 1) + 1);
    }
  },


  renderOneDayCell(monthHeadRow, wkdRow, dateCursor) {
    const dayCell = du.addElem(wkdRow, 'td',
      'day ' + dateCursor.monthEvenOrOddCls);
    const dayOfMonth = dateCursor.getDate();
    du.p(dayCell, dayOfMonth);
    if (dayOfMonth < dateCursor.voidDaysWithDateLowerThan) {
      dayCell.className += ' void';
      // eslint-disable-next-line no-param-reassign
      dateCursor.voidDaysWithDateLowerThan = 9000;
      return;
    }

    const { daysOffset } = dateCursor;
    if (daysOffset < 0) { dayCell.className += ' past'; }
    if (!daysOffset) { dayCell.className += ' today'; }

    if ((dayOfMonth === 1) || (!daysOffset)) {
      const head = du.addElem(monthHeadRow, 'td', 'col-head '
        + dateCursor.monthEvenOrOddCls);
      du.p(head, (kisi.monthNamesShort[dateCursor.getMonth()]
        + ' ' + dateCursor.getFullYear()));
    }
  },


};



const curSc = (typeof document === 'object') && document.currentScript;
if (curSc) { curSc.app = EX; }

export default EX;
