import axios from 'axios';
import cheerio from 'cheerio';
import db from './db';

export async function getHTML(url) {
  const { data: html } = await axios.get(url);
  return html;
}

export async function getTwitterFollowers(html) {
  const $ = cheerio.load(html);
  const span = $('[data-nav="followers"] .ProfileNav-value');
  return span.data('count');
}

export async function getInstagramFollowers(html) {
  const $ = cheerio.load(html);
  const dataInString = $('script[type="application/ld+json"]').html();
  if (dataInString === null) {
    return 'Instagram account is private - cannot access';
  }
  const pageObject = JSON.parse(dataInString);
  return parseInt(
    pageObject.mainEntityofPage.interactionStatistic.userInteractionCount
  );
}

export async function getInstagramCount() {
  const html = await getHTML('https://www.instagram.com/aurimasdarg/');
  const instagramCount = await getInstagramFollowers(html);
  return instagramCount;
}

export async function getTwitterCount() {
  const html = await getHTML('https://www.twitter.com/aurimasdarguzis');
  const twitterCount = await getTwitterFollowers(html);
  return twitterCount;
}

export async function runCron() {
  const [iCount, tCount] = await Promise.all([
    getInstagramCount(),
    getTwitterCount()
  ]);
  db.get('twitter')
    .push({
      date: Date.now(),
      count: tCount
    })
    .write();
  db.get('instagram')
    .push({
      date: Date.now(),
      count: iCount
    })
    .write();
  console.log('Done!');
}
