import { FC } from 'react';

import PageBtn from '@elements/PageBtn';

import { useNewsStore } from '@utils/store';

type PageBtnsProps = { maximumNumberOfBtns: number };

const PageBtns: FC<PageBtnsProps> = ({ maximumNumberOfBtns }) => {
  const currentPageNumber = useNewsStore((state) => state.currentPageNumber);
  const totalNumberOfPages = useNewsStore((state) => state.totalNumberOfPages);
  const setCurrentPageNumber = useNewsStore(
    (state) => state.setCurrentPageNumber,
  );

  const goToPage = (pageNumber: number) => setCurrentPageNumber(pageNumber);

  const pageBtns = [];
  for (
    let pageNumber = currentPageNumber;
    pageNumber <=
    Math.min(
      totalNumberOfPages - 1,
      currentPageNumber + maximumNumberOfBtns - 1,
    );
    pageNumber++
  ) {
    pageBtns.push(
      <PageBtn
        key={pageNumber}
        handleClick={() => goToPage(pageNumber)}
        btnText={pageNumber}
        isHighlighted={pageNumber === currentPageNumber}
      />,
    );
  }

  return <>{pageBtns}</>;
};

export default PageBtns;
