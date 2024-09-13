import { FC } from 'react';
import { clsx } from 'clsx';

type PageBtnProps = {
  btnText: number | 'prev' | 'next';
  handleClick: () => void;
  isHighlighted?: boolean;
};

const PageBtn: FC<PageBtnProps> = ({
  btnText,
  handleClick,
  isHighlighted = false,
}) => {
  return (
    <button
      onClick={handleClick}
      className={clsx(
        'text-primaryDark hover:underline hover:font-bold text-xl bg-red-100 px-2 py-1 rounded-lg',
        isHighlighted ? 'font-bold underline' : '',
      )}
    >
      {btnText}
    </button>
  );
};

export default PageBtn;
