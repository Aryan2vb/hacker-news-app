import * as cheerio from 'cheerio';

const GetUpvoteUrl = (itemId) =>
    fetch(`https://news.ycombinator.com/item?id=${itemId}`, {
      mode: 'no-cors',
      credentials: 'include',
    })
      .then(response => response.text())
      .then(responseText => {
        const document = cheerio.load(responseText);
        return document(`#up_${itemId}`).attr('href');
      });


export default GetUpvoteUrl