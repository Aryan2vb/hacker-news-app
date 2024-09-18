import { useEffect, useState, useRef, useCallback } from "react";
import Article from '../components/ArticleListComponent';
import Spinner from '../components/misc/Spinner'

function Home() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20; // Define the number of items per page
  const loader = useRef(null);

  const cacheName = 'article-cache';
  const cacheExpiration = 600 * 1000; // 10 minutes in milliseconds

  const fetchData = async (page) => {
    const cache = await caches.open(cacheName);

    const checkCacheExpiration = async (page) => {
      const cachedResponse = await cache.match(`page_${page}`);
      if (cachedResponse) {
        const { data, timestamp } = await cachedResponse.json();
        if (Date.now() - timestamp < cacheExpiration) {
          return data;
        } else {
          await cache.delete(`page_${page}`);
        }
      }
      return null;
    };

    const cachedData = await checkCacheExpiration(page);
    if (cachedData) {
      setData(prevData => [
        ...prevData,
        ...cachedData
      ]);
      return;
    }

    // If not in cache or data is expired, fetch from the API
    const response = await fetch("https://hacker-news.firebaseio.com/v0/topstories.json");
    const result = await response.json();
    const pageData = result.slice((page - 1) * itemsPerPage, page * itemsPerPage);
    
    // Add fetched data to the cache with timestamp
    const dataToCache = {
      data: pageData,
      timestamp: Date.now()
    };
    await cache.put(`page_${page}`, new Response(JSON.stringify(dataToCache)));
    
    setData(prevData => [
      ...prevData,
      ...pageData
    ]);
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const handleObserver = useCallback((entries) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: '20px',
      threshold: 1.0
    });
    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => {
      if (loader.current) {
        observer.unobserve(loader.current);
      }
    };
  }, [handleObserver]);

  return (
    <section>
      <ol>
        {data.map((post, index) => (
          <li>
            <a key={post} href={`/post/${post}`} id={post}>
              <Article id={post} />
            </a>
          </li>
        ))}
      </ol>
      <div ref={loader} style={{ height: '50px', marginBottom: '10px' }}>
        <Spinner />
      </div>
    </section>
  );
}

export default Home;
