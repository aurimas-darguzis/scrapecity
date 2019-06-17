import { useContext } from 'react';
import { ScrapeContext } from './ScrapeContext';
import Table from './Table';
import Chart from './Chart';

export default function Data() {
  const { scrapes } = useContext(ScrapeContext);
  return (
    <div>
      <Chart scrapes={scrapes.twitter} />
      <Chart scrapes={scrapes.instagram} />
      <h2>Twitter:</h2>
      <Table scrapes={scrapes.twitter} />
    </div>
  );
}
