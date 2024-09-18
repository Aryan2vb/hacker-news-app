import React from 'react'

export default function PostSkeleton() {
    return (
      <div className="bg-white shadow-md rounded-lg p-4 mb-4 text-white animate-pulse">
      <div className="flex items-center mb-2">
        <a className="font-bold mr-2">
        Lorem Ipsum 
        </a>
        <span className="text-xs text-gray-500"></span>
      </div>

      <div className="mb-2">
        <a className="text-lg font-medium hover:underline">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </a>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-500"></span>
        
        <a className="flex items-center text-xs text-gray-500 hover:text-blue-500">
        </a>
      </div>
    </div>)
}
