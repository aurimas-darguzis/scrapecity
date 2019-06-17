import { useState, useEffect } from 'react';
import { ScrapeProvider } from './ScrapeContext';

function useScrapes() {
  // initial state inside our hook
  const [scrapes, setScrapes] = useState({
    twitter: [],
    instagram: []
  });
  // fetch function
  async function fetchScrapes() {
    const res = await fetch('http://localhost:2090/aggregate');
    const data = await res.json();
    setScrapes(data);
  }
  // didMount/didUpdate
  useEffect(() => {
    fetchScrapes();
  }, []);
  return { scrapes, fetchScrapes };
}

export default function Page({ children }) {
  const hookInfo = useScrapes();

  return (
    <ScrapeProvider value={hookInfo}>
      <div className='page'>{children}</div>
    </ScrapeProvider>
  );
}
