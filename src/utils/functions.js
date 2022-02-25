export function formatDate(date) {
  const dateArr = new Date(date).toDateString().split(' ');
  return `${dateArr[1]} ${dateArr[2]}, ${dateArr[3]}`;
}

export function formatMinutes(minutes) {
  const hoursArr = (minutes / 60).toFixed(2).split('.');
  return `${hoursArr[0]}h ${hoursArr[1]}m`;
}
