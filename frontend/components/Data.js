import { useContext } from 'react';
import { ScrapeContext } from './ScrapeContext';
import { distanceInWords } from 'date-fns';

export default function Data() {
  const { scrapes } = useContext(ScrapeContext);
  return (
    <div>
      <h2>Your data:</h2>
      <table>
        <thead>
          <tr>
            <td>Count</td>
            <td>Time</td>
          </tr>
        </thead>
        <tbody>
          {scrapes.twitter.map(scrape => {
            return (
              <tr key={scrape.date}>
                <td>{scrape.count}</td>
                <td>{distanceInWords(new Date(scrape.date), new Date())}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
