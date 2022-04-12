export function formatDate(date) {
  const dateArr = new Date(date).toDateString().split(' ');
  return `${dateArr[1]} ${dateArr[2]}, ${dateArr[3]}`;
}

export function formatMinutes(minutes) {
  const hoursArr = (minutes / 60).toFixed(2).split('.');
  return `${hoursArr[0]}h ${hoursArr[1]}m`;
}

export function slugify(str) {
  return str
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '');
}

export function titleize(str) {
  const words = str.split('_');
  return words
    .map((word) => word.charAt(0).toUpperCase() + word.substring(1))
    .join(' ');
}
