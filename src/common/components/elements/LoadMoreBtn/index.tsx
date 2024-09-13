import { useNewsStore } from '@utils/store';

const LoadMoreBtn = () => {
  const currentPageNumber = useNewsStore((state) => state.currentPageNumber);
  const totalNumberOfPages = useNewsStore((state) => state.totalNumberOfPages);
  const setCurrentPageNumber = useNewsStore(
    (state) => state.setCurrentPageNumber,
  );

  const handleClick = () =>
    setCurrentPageNumber((currentPageNumber + 1) % totalNumberOfPages);

  return (
    <button
      className="underline underline-offset-2 drop-shadow text-primaryDark text-sm font-bold"
      onClick={handleClick}
    >
      LOAD MORE
    </button>
  );
};

export default LoadMoreBtn;
