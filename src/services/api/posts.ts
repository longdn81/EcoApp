import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

const API_BASE = 'https://jsonplaceholder.typicode.com';

export const fetchPosts = async (): Promise<Post[]> => {
  const response = await fetch(`${API_BASE}/posts?_limit=8`);
  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }
  return response.json();
};

export const createPost = async (newPost: Omit<Post, 'id'>): Promise<Post> => {
  const response = await fetch(`${API_BASE}/posts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newPost),
  });
  if (!response.ok) {
    throw new Error('Failed to create post');
  }
  return response.json();
};

export const POSTS_QUERY_KEY = ['posts'] as const;

export function usePostsQuery() {
  return useQuery({
    queryKey: POSTS_QUERY_KEY,
    queryFn: fetchPosts,
  });
}

export function useCreatePostMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPost,
    onSuccess: (newPost) => {
      // Optimistically or explicitly update cache
      queryClient.setQueryData<Post[]>(POSTS_QUERY_KEY, (oldPosts = []) => [
        { ...newPost, id: Date.now() },
        ...oldPosts,
      ]);
    },
  });
}

