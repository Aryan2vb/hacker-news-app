import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Article from '../components/ArticleDisplayComponent';
import Comment from '../components/CommentComponent';
import Spinner from '../components/misc/Spinner'

function Post() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`https://hacker-news.firebaseio.com/v0/item/${postId}.json`)
      .then(res => res.json())
      .then(data => {
        setPost(data)
        setLoading(false)
      });
  }, [postId]);

  if (loading) {
    return <Spinner />
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Article article={post} />
      <div className="mt-4">
        <h2 className="text-xl font-bold mb-4">Comments</h2>
        {post.kids && post.kids.map((commentId) => (
          <Comment key={commentId} id={commentId} />
        ))}
      </div>
    </div>
  );
}

export default Post;
