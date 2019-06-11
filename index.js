import { getHTML, getInstagramCount, getTwitterCount } from './lib/scraper';

async function go() {
  const [iCount, tCount] = await Promise.all([
    getInstagramCount(),
    getTwitterCount()
  ]);

  console.log(
    `You have ${tCount} twitter followers and ${iCount} instagram followers!`
  );
}

go();
