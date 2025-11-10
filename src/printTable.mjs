const EX = function printTable(table) {
  Array.from(table.children).forEach(function printRow(row) {
    console.log(Array.from(row.children).map(function fmtCell(cell) {
      let tx = cell.innerText || '';
      if (cell.className.endsWith(' past')) { tx = '(' + tx + ')'; }
      tx = '| ' + tx;
      const span = (+cell.getAttribute('colspan') || 0);
      if (span) { tx += Array.from({ length: span - 1 }).join('\t'); }
      return tx;
    }).join('\t') + '\t|');
  });
};

export default EX;
