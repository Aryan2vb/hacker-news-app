import { FC } from 'react';
import { BsTriangleFill } from 'react-icons/bs';

import StoryFooter from '@elements/StoryFooter';

import getDomainName from '@utils/getDomainName';

import { NewsDataType } from 'types/news';

type NewsPropsType = {
  newsData: NewsDataType;
};

const News: FC<NewsPropsType> = ({ newsData }) => {
  const { id, title, url } = newsData;
  return (
    <div className="flex gap-5 px-8 py-5 rounded-md border-b-[1px] bg-primaryLight">
      <div className="flex gap-5 py-3 items-center">
        <h3 className="text-lg font-bold text-newsIdColor">{id}</h3>
        <BsTriangleFill className="text-md text-primaryDark hover:cursor-pointer" />
      </div>
      <div>
        <div className="flex gap-5 items-center text-newsFontColor">
          <a href={url} className="text-xl font-medium">
            {title}
          </a>
          {url && (
            <a
              href={url}
              className="text-md hover:underline hover:underline-offset-2"
            >
              ({getDomainName(url)})
            </a>
          )}
        </div>
        <StoryFooter newsData={newsData} />
      </div>
    </div>
  );
};

export default News;
