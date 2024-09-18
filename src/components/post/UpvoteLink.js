import React, { useState, useEffect } from 'react';
import * as cheerio from 'cheerio';


export default function UpvoteLink({ itemId }) {
    const [upvoteUrl, setUpvoteUrl] = useState(null);

    console.log(itemId)

    useEffect(() => {
        fetch(`https://news.ycombinator.com/item?id=${itemId}`, {
            mode: 'no-cors'
        })
        .then(response => response.text())
        .then(responseText => {
            const document = cheerio.load(responseText);
            setUpvoteUrl(document(`#up_${itemId}`).attr('href'))
        })
        .catch(error => {
            console.error('Error fetching upvote URL:', error);
        });
    }, [itemId]);

    return (
        <a href={upvoteUrl}>{upvoteUrl ? 'Upvote' : ''}</a>
    );
}
