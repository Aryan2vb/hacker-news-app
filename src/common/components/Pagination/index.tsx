import PageBtn from '@elements/PageBtn';
import PageBtns from './PageBtns';

import { useNewsStore } from '@utils/store';

const Pagination = () => {
  const currentPageNumber = useNewsStore((state) => state.currentPageNumber);
  const totalNumberOfPages = useNewsStore((state) => state.totalNumberOfPages);
  const setCurrentPageNumber = useNewsStore(
    (state) => state.setCurrentPageNumber,
  );

  const goToPreviousPage = () =>
    setCurrentPageNumber(Math.max(0, currentPageNumber - 1));

  const goToNextPage = () =>
    setCurrentPageNumber(
      Math.min(totalNumberOfPages - 1, currentPageNumber + 1),
    );

  return (
    <div className="flex gap-3">
      {currentPageNumber > 0 && (
        <PageBtn btnText="prev" handleClick={goToPreviousPage} />
      )}
      <PageBtns maximumNumberOfBtns={5} />
      {currentPageNumber != totalNumberOfPages - 1 && (
        <PageBtn btnText="next" handleClick={goToNextPage} />
      )}
    </div>
  );
};

export default Pagination;
