import { useEffect, useState } from "react";
import { RiDiscussFill } from "react-icons/ri";
import TimesAgo from '../../helpers/TimesAgo'
import GetDomain from '../../helpers/GetDomain'

export default function NewestPostComponent({article}) {
    const [loading, setLoading] = useState(false);
  
    return (
      <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <div className="flex items-center mb-2">
        <a href={`/user/${article.author}`} className="font-bold mr-2">
          {article.author}
        </a>
        <span className="text-xs text-gray-500">{TimesAgo(new Date(article.created_at_i * 1000))}</span>
      </div>

      <div className="mb-2">
        <a href={article.url} className="text-lg font-medium text-gray-900 hover:underline">
          {article.title}
        </a>
        <a className="text-xs"> 
        {' '}{'('}{GetDomain(article.url)}{')'}
        </a>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-500">{article.points === 1 ? `${article.points} point` : `${article.points} points`}</span>
        
        <a href={`/post/${article.objectID}`} className="flex items-center text-xs text-gray-500 hover:text-blue-500">
          <RiDiscussFill size={16} className="mr-1" />
          <span>discuss</span>
        </a>
      </div>
    </div>
    );
  }
  