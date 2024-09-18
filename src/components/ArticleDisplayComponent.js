import React from "react";
import { FaComments } from 'react-icons/fa';

export default function Article({ article }) {
  if (!article) {
    return <></>;
  }

  const kidsCount = Array.isArray(article.kids) ? article.kids.length : 0;

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <div className="flex items-center mb-2">
        <a href={`/user/${article.by}`} className="font-bold mr-2">
          {article.by}
        </a>
        <span className="text-xs text-gray-500">{new Date(article.time * 1000).toLocaleString()}</span>
      </div>

      <div className="mb-2">
        <a href={article.url} className="text-lg font-medium text-gray-900 hover:underline">
          {article.title}
        </a>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-500">{article.score} points</span>
        
        <a className="flex items-center text-xs text-gray-500">
          <FaComments size={16} className="mr-1" />
          <span>{kidsCount} comments</span>
        </a>
      </div>
    </div>
  );
}
