export function str2Array(s: string): (number | null)[] {
  s = s.replace(/\[/, '');
  s = s.replace(/\]/, '');
  const tokens = s.split(',');
  const arr = [];
  for (const token of tokens) {
    const t = token.trim();
    if (t.match(/^-?\d+$/)) {
      arr.push(Number(t));
    } else if (t === '' || t === 'null') {
      arr.push(null);
    }
  }
  return arr;
}
