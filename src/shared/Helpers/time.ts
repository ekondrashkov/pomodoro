export function rightTimeDisplay(overalTime: number) {
  let timeToDisplay: string = '';
  let hours: number = Math.floor(overalTime / 60);
  let minutes: number = overalTime % 60;
  let hoursName: string = '';
  let minName: string = '';

  if (hours > 0) {
    switch (hours) {
      case 1:
        hoursName = 'hour';
        break;
      default:
        hoursName = 'hours'
    }
  }

  switch (minutes) {
    case 1:
      minName = 'minute';
      break;
    default:
      minName = 'minutes'
  }

  hours > 0 ? timeToDisplay = (`${hours} ${hoursName} ${minutes} ${minName}`) : timeToDisplay = (`${minutes} ${minName}`);

  return timeToDisplay;
}
