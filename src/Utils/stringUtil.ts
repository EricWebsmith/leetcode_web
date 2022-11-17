export function reverse(s: string): string {
  const arr = s.split('');
  arr.reverse();
  return arr.join('');
}
