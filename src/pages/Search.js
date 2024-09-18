import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import NewestPostComponent from '../components/post/NewestPostComponent';
import Spinner from '../components/misc/Spinner';
import { FaSearch } from 'react-icons/fa';

export default function Search() {
    const [searchParams, setSearchParams] = useSearchParams();
    const q = searchParams.get('q');

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    const searchMobile = (e) => {
        e.preventDefault();
        setSearchParams({ q: e.target.elements.search.value });
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            setSearchParams({ q: e.target.value });
        }
    };

    useEffect(() => {
        if (q) {
            setLoading(true);
            fetch(`https://hn.algolia.com/api/v1/search?query=${q}&tags=story`)
                .then((r) => r.json())
                .then((d) => {
                    setData(d);
                    setLoading(false);
                });
        }
    }, [q]);

    if (loading) {
        return (
            <>
                <form onSubmit={searchMobile}>
                    <div className="m-5">
                    <FaSearch size={12} className='relative top-7 left-4' />
                        <input
                            type="text"
                            name="search"
                            className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            placeholder="Search"
                            onKeyPress={handleKeyPress}
                        />
                    </div>
                </form>
                <Spinner />
            </>
        )
    }

    if (!data) {
        return (
            <form onSubmit={searchMobile}>
                <div className="m-5">
                <FaSearch size={12} className='relative top-7 left-4' />
                    <input
                        type="text"
                        name="search"
                        className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        placeholder="Search"
                        onKeyPress={handleKeyPress}
                    />
                </div>
            </form>
        )
    }

    return (
        <div>
            <form onSubmit={searchMobile}>
                <div className="m-5">
                <FaSearch size={12} className='relative top-7 left-4' />
                    <input
                        type="text"
                        name="search"
                        className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        placeholder="Search"
                        onKeyPress={handleKeyPress}
                    />
                </div>
            </form>

            <div className="sm:text-[2em] text-[1em] font-bold text-center m-2">
                Search results for: {q}
            </div>
            <ol>
                {data.hits.map((post) => (
                    <li key={post.objectID}>
                        <a href={`/post/${post.objectID}`} id={post.objectID}>
                            <NewestPostComponent article={post} />
                        </a>
                    </li>
                ))}
            </ol>
        </div>
    );
}
