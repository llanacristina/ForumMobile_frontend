import React, { createContext, useState, ReactNode } from 'react';
import { Post } from '../types/types'; 

interface PostContextProps {
  posts: Post[];
  selectedPost: Post | null;
  setSelectedPost: (post: Post | null) => void;
  setPosts: (posts: Post[]) => void;
  updateCommentsCount: (postId: string, count: number) => void;
}

export const PostContext = createContext<PostContextProps | undefined>(undefined);

export const PostProvider = ({ children }: { children: ReactNode }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const updateCommentsCount = (postId: string, count: number) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post._id === postId ? { ...post, commentsCount: count } : post
      )
    );
  };

  return (
    <PostContext.Provider value={{ posts, selectedPost, setPosts, setSelectedPost, updateCommentsCount }}>
      {children}
    </PostContext.Provider>
  );
};
