import { useContext } from 'react';
import { ScrapeContext } from './ScrapeContext';
import { distanceInWords } from 'date-fns';

export default function Data() {
  const { scrapes } = useContext(ScrapeContext);
  return (
    <div>
      <h2>Your data:</h2>
      <ul>
        {scrapes.twitter.map(scrape => {
          return (
            <li key={scrape.date}>
              {scrape.count} -{' '}
              {distanceInWords(new Date(scrape.date), new Date())}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
