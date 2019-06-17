import { useContext } from 'react';
import { ScrapeContext } from './ScrapeContext';
import Table from './Table';

export default function Data() {
  const { scrapes } = useContext(ScrapeContext);
  return (
    <div>
      <h2>Twitter:</h2>
      <Table scrapes={scrapes.twitter} />
    </div>
  );
}
