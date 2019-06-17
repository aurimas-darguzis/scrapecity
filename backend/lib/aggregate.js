function isInLastSixHours(timestamp) {
  const sixHoursAgo = 1000 * 60 * 60 * 6;
  return Date.now() - timestamp < sixHoursAgo;
}

export default function aggregate(scrapes) {
  const aggregateScrapes = scrapes
    .map(scrape => {
      const date = new Date(scrape.date);
      const optionalHour = isInLastSixHours(scrape.date)
        ? `-${date.getHours()}`
        : ``;
      const key = `${date.getUTCFullYear()}-${date.getMonth()}-${date.getDate()}${optionalHour}`;
      return {
        key,
        ...scrape
      };
    })
    .reduce((accumulator, currentScrape) => {
      // if it is not found, we want to keep it
      if (!accumulator.find(scrape => scrape.key === currentScrape.key)) {
        return [...accumulator, currentScrape];
      } else {
        return accumulator;
      }
    }, []);
  return aggregateScrapes;
}
