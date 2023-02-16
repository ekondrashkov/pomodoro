export function graphTimeDisplay(overalTime: number) {
  let timeToDisplay: string = '';
  let hours: number = Math.floor(overalTime / 60);
  let minutes: number = overalTime % 60;
  let minName: string = '';

  minutes > 2 ? minName = Math.round(minutes).toString() : minName = minutes.toFixed(1);

  hours > 0 ? timeToDisplay = (`${hours} h ${minName} min`) : timeToDisplay = (`${minName} min`);

  return timeToDisplay;
}
