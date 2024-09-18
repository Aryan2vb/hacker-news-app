import React, { useEffect, useState } from 'react';
import CommentReplyComponent from './CommentReplyComponent'
import TimesAgo from '../helpers/TimesAgo'
import '../styles/ComentComp.css';

const Comment = ({ id }) => {
  const [comment, setComment] = useState(null);
  const [replies, setReplies] = useState([]);
  const [showReplies, setShowReplies] = useState(false);
  const [loadingReplies, setLoadingReplies] = useState(false);

  useEffect(() => {
    const fetchComment = async () => {
      try {
        const cache = await caches.open('comment-cache');
        const cachedResponse = await cache.match(id.toString());
        
        if (cachedResponse) {
          const data = await cachedResponse.json();
          setComment(data);
        } else {
          const response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
          const data = await response.json();
          setComment(data);
          await cache.put(id.toString(), new Response(JSON.stringify(data)));
        }
      } catch (error) {
        console.error('Error fetching comment:', error);
      }
    };
    fetchComment();
  }, [id]);

  const fetchReplies = async () => {
    setLoadingReplies(true);
    try {
      const repliesData = await Promise.all(
        comment.kids.map(async (kidId) => {
          const cache = await caches.open('comment-cache');
          const cachedResponse = await cache.match(kidId.toString());
          
          if (cachedResponse) {
            return cachedResponse.json();
          } else {
            const response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${kidId}.json`);
            const data = await response.json();
            await cache.put(kidId.toString(), new Response(JSON.stringify(data)));
            return data;
          }
        })
      );
      setReplies(repliesData);
    } catch (error) {
      console.error('Error fetching replies:', error);
    }
    setLoadingReplies(false);
  };

  const handleShowReplies = () => {
    if (!showReplies) {
      fetchReplies();
    }
    setShowReplies(!showReplies);
  };

  if (!comment) {
    return (
      <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <div className="flex items-center mb-2">
        <a href='' className="font-bold text-orange-500 mr-2">
          
        </a>
        <span className="text-xs text-gray-500"></span>
      </div>
    </div>
    )
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4 text-wrap">
      <div className="flex items-center mb-2">
        <a href={`/user/${comment.by}`} className="font-bold mr-2">
          {comment.by}
        </a>
        <span className="text-xs text-gray-500">{TimesAgo(new Date(comment.time * 1000))}</span>
      </div>
      <div className="text-gray-900 text-wrap" dangerouslySetInnerHTML={{ __html: comment.text }} />
      {comment.kids && comment.kids.length > 0 && (
        <div>
          <button onClick={handleShowReplies} className="text-blue-500 text-sm mt-2">
            {showReplies ? 'Hide replies' : `See ${comment.kids.length} more replies`}
          </button>
          {showReplies && (
            <div className="mt-4 pl-4 border-l border-gray-300">
              {loadingReplies ? (
                <>Loading replies...</>
              ) : (
                replies.map((reply) => (
                  <CommentReplyComponent key={reply.id} id={reply.id} />
                ))
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Comment;
