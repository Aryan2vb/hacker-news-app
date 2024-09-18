import { useEffect, useState } from "react";
import { FaComments } from 'react-icons/fa';
import PostSkeleton from './post/PostSkeleton'
import TimesAgo from '../helpers/TimesAgo'
import GetDomain from '../helpers/GetDomain'
import UpvoteLink from './post/UpvoteLink'

export default function ArticleListComponent(props) {
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(false);
  
    useEffect(() => {
      const fetchArticle = async (id) => {
        setLoading(true);
        try {
          // Check if article is in cache
          const cache = await caches.open('article-cache');
          const cachedResponse = await cache.match(props.id.toString());
  
          if (cachedResponse) {
            const data = await cachedResponse.json();
            setArticle(data);
            setLoading(false);
            return;
          }
  
          // If not in cache, fetch from API
          const response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
          const data = await response.json();
  
          // Cache the fetched response
          await cache.put(props.id.toString(), new Response(JSON.stringify(data)));
  
          setArticle(data);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching article:', error);
          setLoading(false);
        }
      };
  
      fetchArticle(props.id);
    }, [props.id]);
  
    const refreshArticle = async () => {
      // Clear cache
      const cache = await caches.open('article-cache');
      await cache.delete(props.id.toString());
  
      // Fetch new data from API
      setLoading(true);
      const response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${props.id}.json`);
      const data = await response.json();
      await cache.put(props.id.toString(), new Response(JSON.stringify(data)));
      setArticle(data);
      setLoading(false);
    };
  
    if (loading) {
      return (<PostSkeleton />)
    }
  
    if (!article) {
      return <></>;
    }
  
    const kidsCount = Array.isArray(article.kids) ? article.kids.length : 0;

    return (
      <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <div className="flex items-center mb-2">
        <a href={`/user/${article.by}`} className="font-bold mr-2">
          {article.by}
        </a>
        <span className="text-xs text-gray-500">{TimesAgo(new Date(article.time * 1000))}</span>
      </div>

      <div className="mb-2">
        <a href={article.url} className="text-lg font-medium text-gray-900 hover:underline">
          {article.title}
        </a>
        <a className="text-xs"> 
        {' '}{'('}{GetDomain(article.url)}{')'}
        </a>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-500">{article.score} points</span>
        
        <a href={`/post/${article.id}`} className="flex items-center text-xs text-gray-500 hover:text-blue-500">
          <FaComments size={16} className="mr-1" />
          <span>{article.descendants} comments</span>
        </a>
      </div>
    </div>
    );
  }
  