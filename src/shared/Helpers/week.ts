export interface IWeekDigits {
  dayNum: number;
  dayName: string;
  dayShortName: string;
  date: string;
  pomsDone: number;
  stops: number;
  timepaused: number;
  timeworking: number;
}

export function showMonth(month: number) {
  let sowedMonth: string = '';
  switch (month) {
    case 1:
      sowedMonth = 'February'
      break;
    case 2:
      sowedMonth = 'March';
      break;
    case 3:
      sowedMonth = 'April';
      break;
    case 4:
      sowedMonth = 'May';
      break;
    case 5:
      sowedMonth = 'June';
      break;
    case 6:
      sowedMonth = 'July';
      break;
    case 7:
      sowedMonth = 'August';
      break;
    case 8:
      sowedMonth = 'September';
      break;
    case 9:
      sowedMonth = 'October';
      break;
    case 10:
      sowedMonth = 'November';
      break;
    case 11:
      sowedMonth = 'December';
      break;
    case 0:
      sowedMonth = 'January';
      break;
  }

  return sowedMonth;
}

export function getDateFn(today: number, day: number, curDay: number, index: number) {
  let todayDay = day;
  if (day === 0) todayDay = 7;
  const fullDate = new Date(today + ((curDay - todayDay) * 24 * 60 * 60 * 1000) - index * 7 * 24 * 60 * 60 * 1000);
  const dateNum = fullDate.getDate();
  const dateMonth = showMonth(fullDate.getMonth());

  return `${dateNum} ${dateMonth}`
}

export function weekStatLoad() {
  let pomStat: Array<Array<IWeekDigits>> = [];
  const todayDate = new Date();
  const todayDay: number = todayDate.getDay();
  const dayInDigit = Number(todayDate);

  for (let i = 0; i < 3; i++) {
    let week: Array<IWeekDigits> = [
      {
        dayNum: 1,
        dayName: 'Monday',
        dayShortName: 'Mo',
        date: getDateFn(dayInDigit, todayDay, 1, i),
        pomsDone: 0,
        stops: 0,
        timepaused: 0,
        timeworking: 0,
      },
      {
        dayNum: 2,
        dayName: 'Tuesday',
        dayShortName: 'Tu',
        date: getDateFn(dayInDigit, todayDay, 2, i),
        pomsDone: 0,
        stops: 0,
        timepaused: 0,
        timeworking: 0,
      },
      {
        dayNum: 3,
        dayName: 'Wednesday',
        dayShortName: 'We',
        date: getDateFn(dayInDigit, todayDay, 3, i),
        pomsDone: 0,
        stops: 0,
        timepaused: 0,
        timeworking: 0,
      },
      {
        dayNum: 4,
        dayName: 'Thursday',
        dayShortName: 'Th',
        date: getDateFn(dayInDigit, todayDay, 4, i),
        pomsDone: 0,
        stops: 0,
        timepaused: 0,
        timeworking: 0,
      },
      {
        dayNum: 5,
        dayName: 'Friday',
        dayShortName: 'Fr',
        date: getDateFn(dayInDigit, todayDay, 5, i),
        pomsDone: 0,
        stops: 0,
        timepaused: 0,
        timeworking: 0,
      },
      {
        dayNum: 6,
        dayName: 'Saturday',
        dayShortName: 'Sa',
        date: getDateFn(dayInDigit, todayDay, 6, i),
        pomsDone: 0,
        stops: 0,
        timepaused: 0,
        timeworking: 0,
      },
      {
        dayNum: 0,
        dayName: 'Sunday',
        dayShortName: 'Su',
        date: getDateFn(dayInDigit, todayDay, 7, i),
        pomsDone: 0,
        stops: 0,
        timepaused: 0,
        timeworking: 0,
      }
    ]

    pomStat.push(week);
  }

  localStorage.setItem('pomStat', JSON.stringify(pomStat));

  return pomStat;
}

