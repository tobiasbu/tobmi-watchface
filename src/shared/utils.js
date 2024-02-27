
const regex = /(#+)/gis;

/**
 * Creates a array of paths
 * @param {string} filePattern
 */
export function imgArray(filePattern, startIndex = 0, endIndex = 10) {
  const arr = [];
  for (let i = startIndex; i < endIndex; i += 1) {
    const fileName = filePattern.replace(regex, (a, b) => {
      if (b.length > 1) {
        return String(i).padStart(b.length, "0");
      }
      return String(i);
    })

    arr.push(fileName)
  }
  return arr;
}
