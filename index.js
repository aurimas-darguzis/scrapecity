import {
  getHTML,
  getTwitterFollowers,
  getInstagramFollowers
} from './lib/scraper';

async function go() {
  const iPromise = getHTML('https://www.instagram.com/aurimasdarg');
  const tPromise = getHTML('https://www.twitter.com/aurimasdarguzis');
  const [instagramHTML, twitterHTML] = await Promise.all([iPromise, tPromise]);
  const instagramCount = (await getInstagramFollowers(instagramHTML)) || 0;
  const twCount = (await getTwitterFollowers(twitterHTML)) || 0;
  console.log(
    `You have ${twCount} twitter followers and ${instagramCount} instagram followers!`
  );
}

go();
