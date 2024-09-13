import { useState, useEffect } from 'react';

import News from '@components/News';

import { useNewsStore } from '@utils/store';
import { getNewsDataFromAPIResponse } from '@utils/getDataFromAPIResponse';
import { getPageNumberParam, getCurrentTimeParam } from '@utils/apiUrl';

import { NewsDataType } from 'types/news';

const NewStoriesNewsContainer = () => {
  const currentPageNumber = useNewsStore((state) => state.currentPageNumber);
  const totalNumberOfPages = useNewsStore((state) => state.totalNumberOfPages);
  const setCurrentPageNumber = useNewsStore(
    (state) => state.setCurrentPageNumber,
  );
  const setTotalNumberOfPages = useNewsStore(
    (state) => state.setTotalNumberOfPages,
  );

  // WARNING: curr page = -1 applies only to home page and not other pages
  if (currentPageNumber == -1) setCurrentPageNumber(0);

  const [newsData, setNewsData] = useState<NewsDataType[]>([]);

  useEffect(() => {
    const API_URL =
      'https://hn.algolia.com/api/v1/search_by_date?tags=story&numericFilters=created_at_i<=' +
      getCurrentTimeParam() +
      getPageNumberParam(currentPageNumber);

    const fetchNewsDataFromAPI = async () => {
      const response = await fetch(API_URL);
      const data = await response.json();

      if (currentPageNumber == 0) setTotalNumberOfPages(data.nbPages);

      // WARNING: currentPageNumber - 1 because the same function assumes that the minimum page number is -1 (because of home page's default behaviour)
      setNewsData(
        getNewsDataFromAPIResponse(
          data.hits,
          currentPageNumber - 1,
          data.hitsPerPage,
        ),
      );
    };

    fetchNewsDataFromAPI();
  }, [currentPageNumber, totalNumberOfPages]);

  return (
    <div className="bg-primaryLight border-[1px] rounded-md">
      {newsData.map((news: NewsDataType) => (
        <News key={news.id} newsData={news} />
      ))}
    </div>
  );
};

export default NewStoriesNewsContainer;
