export function showTextDay(day: number) {
  let sowedDay: string = '';
  switch (day) {
    case 1:
      sowedDay = 'Monday';
      break;
    case 2:
      sowedDay = 'Tuesday';
      break;
    case 3:
      sowedDay = 'Wednesday';
      break;
    case 4:
      sowedDay = 'Thursday';
      break;
    case 5:
      sowedDay = 'Friday';
      break;
    case 6:
      sowedDay = 'Saturday';
      break;
    case 0:
      sowedDay = 'Sunday';
      break;
  }

  return sowedDay;
}
