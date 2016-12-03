const distanceOptions = ["5 miles", "10 miles", "20 miles", "Any"];
const costOptions =  ["$0-5", "$5-20", "$20-100", "$100+"]

export function radii() {
  return distanceOptions;
}

export function costBrackets() {
  return costOptions;
}
