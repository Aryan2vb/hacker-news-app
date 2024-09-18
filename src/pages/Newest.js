import React, { useEffect, useState } from 'react'
import Spinner from '../components/misc/Spinner'
import NewestPostComponent from '../components/post/NewestPostComponent'

export default function Newest() {

    const [data, setData] = useState(null)

    useEffect(() => {

        
        fetch("https://hn.algolia.com/api/v1/search_by_date?tags=story")
        .then(r => r.json())
        .then(d => setData(d))

    }, [])

    if (data === null) {
        return <Spinner />
    }

  return (
    <div>
      <div className='sm:text-[2em] text-[1em] font-bold text-center m-2'>
        Newest
      </div>
      <ol>
        {data.hits.map((post, index) => (
          <li>
            <a key={post.objectID} href={`/post/${post.objectID}`} id={post.objectID}>
              <NewestPostComponent article={post} />
            </a>
          </li>
        ))}
      </ol>
    </div>
  )
}
