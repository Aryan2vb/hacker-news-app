import { useState, useEffect } from 'react';
import { ArrowUp, MessageSquare, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Story, Comment } from '../types';
import { useApp } from '../context/AppContext';

interface NewsListProps {
  searchQuery: string;
}

export default function NewsList({ searchQuery }: NewsListProps) {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalStories, setTotalStories] = useState(0);
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loadingComments, setLoadingComments] = useState(false);
  const storiesPerPage = 30;
  const { darkMode } = useApp();

  useEffect(() => {
    const fetchStories = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json');
        const storyIds = await response.json();
        setTotalStories(storyIds.length);

        const startIndex = (page - 1) * storiesPerPage;
        const endIndex = startIndex + storiesPerPage;

        const stories = await Promise.all(
            storyIds.slice(startIndex, endIndex).map(async (id: number) => {
              const response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
              return response.json();
            })
        );

        setStories(stories.filter(Boolean));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching stories:', error);
        setLoading(false);
      }
    };

    fetchStories();
  }, [page]);

  const fetchComments = async (story: Story) => {
    setLoadingComments(true);
    setSelectedStory(story);

    const loadComments = async (commentIds: number[]): Promise<Comment[]> => {
      const comments = await Promise.all(
          commentIds.map(async (id) => {
            const response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
            const commentData = await response.json();
            return {
              ...commentData,
              children: commentData.kids ? await loadComments(commentData.kids) : []
            };
          })
      );
      return comments;
    };

    const storyComments = story.kids ? await loadComments(story.kids) : [];
    setComments(storyComments);
    setLoadingComments(false);
  };

  const filteredStories = stories.filter((story) =>
      story.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      story.by?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (story.url && story.url.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const totalPages = Math.ceil(totalStories / storiesPerPage);

  const renderComments = (comments: Comment[]) => (
      <ul className="pl-6 mt-2 border-l-2 border-gray-700">
        {comments.map((comment) => (
            <li key={comment.id} className="mb-4 text-gray-300">
              <div dangerouslySetInnerHTML={{ __html: comment.text }} />
              {comment.children && renderComments(comment.children)}
            </li>
        ))}
      </ul>
  );

  if (loading) {
    return (
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500" />
        </div>
    );
  }

  return (
      <div className="p-4 md:p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
            <tr className="text-left text-gray-400 text-sm">
              <th className="pb-4 font-medium">№</th>
              <th className="pb-4 font-medium">Title</th>
              <th className="hidden md:table-cell pb-4 font-medium">Source</th>
              <th className="hidden md:table-cell pb-4 font-medium">Posted by</th>
              <th className="pb-4 font-medium">Points</th>
              <th className="pb-4 font-medium">Comments</th>
              <th className="hidden md:table-cell pb-4 font-medium">Time</th>
            </tr>
            </thead>
            <tbody>
            {filteredStories.map((story, index) => (
                <tr key={story.id} className="border-t border-gray-800 text-sm">
                  <td className="py-4 text-gray-400">{(page - 1) * storiesPerPage + index + 1}</td>
                  <td className="py-4">
                    <div className="flex items-center gap-2">
                      <button className="text-gray-400 hover:text-orange-500">
                        <ArrowUp className="w-4 h-4" />
                      </button>
                      <a
                          href={story.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-200 hover:text-orange-500 font-medium"
                      >
                        {story.title}
                      </a>
                    </div>
                  </td>
                  <td className="hidden md:table-cell py-4 text-gray-400">
                    {story.url ? new URL(story.url).hostname : 'self'}
                  </td>
                  <td className="hidden md:table-cell py-4">
                    <span className="text-gray-300">{story.by}</span>
                  </td>
                  <td className="py-4">
                    <span className="text-emerald-500">{story.score} points</span>
                  </td>
                  <td className="py-4">
                    <button
                        onClick={() => fetchComments(story)}
                        className="flex items-center gap-1 text-gray-300 hover:text-orange-500"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>{story.descendants || 0}</span>
                    </button>
                  </td>
                  <td className="hidden md:table-cell py-4 text-gray-400">
                    {Math.floor((Date.now() / 1000 - story.time) / 3600)}h ago
                  </td>
                </tr>
            ))}
            </tbody>
          </table>
        </div>

        {selectedStory && (
            <div className="mt-6">
              <h2 className="text-lg font-semibold text-orange-500">Comments for: {selectedStory.title}</h2>
              {loadingComments ? (
                  <div className="flex items-center justify-center h-24">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-orange-500" />
                  </div>
              ) : (
                  renderComments(comments)
              )}
            </div>
        )}

        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-2 rounded-lg bg-gray-800 dark:bg-gray-900 text-gray-200 hover:bg-gray-700 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-gray-400">Page {page} of {totalPages}</span>
            <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="p-2 rounded-lg bg-gray-800 dark:bg-gray-900 text-gray-200 hover:bg-gray-700 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
  );
}