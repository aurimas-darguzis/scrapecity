export function uniqueCount(scrapes) {
  return scrapes.filter((item, index, array) => {
    if (index === 0) return true; // keep it it's the firstone
    const lastItem = array[index - 1];
    return !(item.count === lastItem.count);
  });
  // return scrapes.reduce((acc, scrape) => {
  //   // check if this one is already in the acc
  //   // if there is already one in the doc
  //   if (!acc.find(el => el.count === scrape.count)) {
  //     return [...acc, scrape];
  //   }
  //   return acc;
  // }, []);
}
