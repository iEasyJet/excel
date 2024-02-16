export function shouldResize(event) {
  return event.target.dataset.resize;
}

export function isCell(event) {
  return event.target.dataset.type === 'cell';
}

export function range(start, end) {
  if (start > end) {
    [end, start] = [start, end];
  }
  return new Array(end - start + 1).fill('').map((_, index) => {
    return start + index;
  });
}

export function matrix($current, $target) {
  const target = $target.id(true);
  const current = $current.id(true);

  const cols = range(current.col, target.col);
  const rows = range(current.row, target.row);

  const ids = cols.reduce((acc, col) => {
    rows.forEach((row) => {
      acc.push(`${row}:${col}`);
    });
    return acc;
  }, []);

  return ids;
}
