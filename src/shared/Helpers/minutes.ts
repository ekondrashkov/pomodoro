export function showWorkMinutes(minutes: number) {
  let soweMinText: string = 'minutes';
  if (minutes === 1) {
    soweMinText = 'minute';
  }

  return soweMinText;
}
