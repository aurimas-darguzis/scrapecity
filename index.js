import express from 'express';
import { getInstagramCount, getTwitterCount } from './lib/scraper';
import db from './lib/db';

const app = express();

app.get('/scrape', async (req, res, next) => {
  console.log('Scraping!');
  const [iCount, tCount] = await Promise.all([
    getInstagramCount(),
    getTwitterCount()
  ]);
  console.log(
    `You have ${tCount} twitter followers and ${iCount} instagram followers!`
  );
  res.json({ iCount, tCount });
});

app.listen(2090, () => console.log(`App is running on port 2090`));
