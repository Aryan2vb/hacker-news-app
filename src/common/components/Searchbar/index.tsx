import { BsSearch } from 'react-icons/bs';

import { useSearchStore } from '@utils/store';

const Searchbar = () => {
  const searchText = useSearchStore((state) => state.searchText);
  const setSearchText = useSearchStore((state) => state.setSearchText);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearchText(e.target.value);

  return (
    <div className="border-[1px] border-primaryDark w-[65%] rounded-md flex gap-3 items-center px-5 bg-white">
      <BsSearch className="text-primaryDark" />
      <input
        type="text"
        className="focus:outline-none p-2 w-full rounded-md"
        value={searchText}
        onChange={handleChange}
        placeholder="Curios... yeah!!!   then search here"
      />
    </div>
  );
};

export default Searchbar;
