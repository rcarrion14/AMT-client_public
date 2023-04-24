export function snapToDateMapp(snapshot: number) {
  // The reference date is correspondig with the reference snapshot
  const referenceDate = new Date("2023-04-23");
  const referenceSnapshot = 236;

  const millisecondsPerDay = 24 * 60 * 60 * 1000;

  const daysToAdd = snapshot - referenceSnapshot;

  const dateInMilliseconds =
    referenceDate.getTime() +
    (referenceSnapshot + daysToAdd) * millisecondsPerDay;
  const date = new Date(dateInMilliseconds);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

  return `${year}-${month}-${day}`;
}
