import express from 'express';
import { getInstagramCount, getTwitterCount } from './lib/scraper';
import db from './lib/db';
import './lib/cron';
import { uniqueCount } from './lib/utils';
import cors from 'cors';

const app = express();
app.use(cors());

app.get('/scrape', async (req, res, next) => {
  console.log('Scraping!');
  const [iCount, tCount] = await Promise.all([
    getInstagramCount(),
    getTwitterCount()
  ]);
  res.json({ iCount, tCount });
});

app.get('/data', async (req, res, next) => {
  // get the scrape data
  const { twitter, instagram } = db.value();
  // filter for only unique values
  const uniqueTwitter = uniqueCount(twitter);
  const uniqueInstagram = uniqueCount(instagram);
  // respond with json
  res.json({ twitter: uniqueTwitter, instagram: uniqueInstagram });
});

app.listen(2090, () => console.log(`App is running on  http://localhost:2090`));
