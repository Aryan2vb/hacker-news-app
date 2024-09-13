import { useState, useEffect } from 'react';

import News from '@components/News';
import Comment from '@components/Comment';

import { useNewsStore, useSearchStore } from '@utils/store';
import {
  getNewsDataFromAPIResponse,
  getCommentDataFromAPIResponse,
  getNewsAndCommentDataFromAPIResponse,
  getNewsDataFromNewsAndCommentData,
  getCommentDataFromNewsAndCommentData,
} from '@utils/getDataFromAPIResponse';
import {
  getSearchTextParam,
  getSearchByParam,
  getSearchCategoryParam,
  getSearchTimeRangeOption,
  getPageNumberParam,
} from '@utils/apiUrl';

import { NewsDataType } from 'types/news';
import { CommentDataType } from 'types/comments';
import { NewsAndCommentDataType } from 'types/newsAndComments';

const SearchPageNewsContainer = () => {
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

  const searchText = useSearchStore((state) => state.searchText);
  const searchCategory = useSearchStore((state) => state.searchCategory);
  const searchByOption = useSearchStore((state) => state.searchByOption);
  const searchTimeRangeOption = useSearchStore(
    (state) => state.searchTimeRangeOption,
  );

  const [newsData, setNewsData] = useState<NewsDataType[]>([]);
  const [commentsData, setCommentsData] = useState<CommentDataType[]>([]);
  const [newsAndCommentsData, setNewsAndCommentsData] = useState<
    NewsAndCommentDataType[]
  >([]);

  useEffect(() => {
    const API_URL =
      'https://hn.algolia.com/api/v1/' +
      getSearchByParam(searchByOption) +
      getSearchTextParam(searchText) +
      getSearchCategoryParam(searchCategory) +
      getSearchTimeRangeOption(searchTimeRangeOption) +
      getPageNumberParam(currentPageNumber);

    const fetchDataFromAPI = async () => {
      const response = await fetch(API_URL);
      const data = await response.json();

      if (currentPageNumber == 0) setTotalNumberOfPages(data.nbPages);

      if (searchCategory === 'comment' || searchCategory === 'all') {
        if (searchCategory === 'comment')
          setCommentsData(getCommentDataFromAPIResponse(data.hits));
        else
          setNewsAndCommentsData(
            getNewsAndCommentDataFromAPIResponse(
              data.hits,
              currentPageNumber - 1,
              data.entriesPerPage,
            ),
          );

        setNewsData([]);
        if (searchCategory === 'all') setCommentsData([]);
      } else {
        if (searchCategory === 'story')
          setNewsData(
            getNewsDataFromAPIResponse(
              data.hits,
              currentPageNumber - 1,
              data.hitsPerPage,
            ),
          );
        else
          setNewsAndCommentsData(
            getNewsAndCommentDataFromAPIResponse(
              data.hits,
              currentPageNumber - 1,
              data.entriesPerPage,
            ),
          );

        setCommentsData([]);
        if (searchCategory === 'all') setNewsData([]);
      }
    };

    fetchDataFromAPI();
  }, [
    currentPageNumber,
    totalNumberOfPages,
    searchText,
    searchCategory,
    searchByOption,
    searchTimeRangeOption,
  ]);

  return (
    <div className="bg-primaryLight border-[1px] rounded-md">
      {newsData &&
        newsData.map((news: NewsDataType) => (
          <News key={news.id} newsData={news} />
        ))}
      {commentsData &&
        commentsData.map((comment: CommentDataType, idx: number) => (
          <Comment key={idx} commentData={comment} />
        ))}
      {newsAndCommentsData &&
        newsAndCommentsData.map(
          (newsAndComment: NewsAndCommentDataType, idx: number) =>
            newsAndComment.isComment ? (
              <Comment
                key={idx}
                commentData={getCommentDataFromNewsAndCommentData(
                  newsAndComment,
                )}
              />
            ) : (
              <News
                key={newsAndComment.id}
                newsData={getNewsDataFromNewsAndCommentData(newsAndComment)}
              />
            ),
        )}
    </div>
  );
};

export default SearchPageNewsContainer;
