const cheerio = require('cheerio');

const GetUpvoteUrl = (itemId) => {
    return fetch(`https://news.ycombinator.com/item?id=${itemId}`, {
        mode: 'no-cors',
        credentials: 'include',
    })
    .then(response => response.text())
    .then(responseText => {
        const document = cheerio.load(responseText);
        return document(`#up_${itemId}`).attr('href');
    })
    .catch(error => {
        console.error('Error fetching upvote URL:', error);
        return null;
    });
};

GetUpvoteUrl(40543651).then(r => console.log(r))