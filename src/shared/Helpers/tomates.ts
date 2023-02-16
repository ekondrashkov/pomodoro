export function showTomatosQuantity(quantity: number) {
  let sowedPoms: string = '';
  switch (quantity) {
    case 1:
      sowedPoms = 'pomodoro';
      break;
    default:
      sowedPoms = 'pomodors';
      break;
  }

  return sowedPoms;
}
