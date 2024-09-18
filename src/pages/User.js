import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function User() {

    const { username } = useParams();

    const [user, setUser] = useState(null)

    useEffect(() => {
        
        fetch(`https://hn.algolia.com/api/v1/users/${username}`)
        .then(res => res.json())
        .then(data => setUser(data))

    }, [])

    if (user === null) {
        return (
            // TODO: make loader
            <>loading</> 
        )
    }

    return (
        <div className='bg-slate-50 p-2 m-2 md:w-1/2'>
            <div className='font-bold text-xl'>
                {user.username}
            </div>
            <div className='text-sm'>{user.karma} karma</div>
            <div className='mt-2'>
                <span className='text-lg font-semibold'>
                    About me:
                </span>
                <div dangerouslySetInnerHTML={{ __html: user.about }} />
            </div>
        </div>
    )
}
