export type User = {
  token: string ;
  _id: string ;
  username: string ;
  email: string;
  profileURL: string ;
  location?: string;
};

export type UserContextProps = {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
};

export interface Post {
  commentsCount: number;
  comments: { content: string; user: { name: string; profileURL: string; userID: string; } }[];
  _id: string;
  title: string;
  content: string;
  date: string;
  user: {
    userID: string;
    name: string;
    profileURL: string | null;
  };
}

export interface Comment {
  _id: string;
  content: string;
  date: string;
  postId: string;
  user: {
    _id: string;
    name: string;
    profileURL: string;
    userID: string;
  };
}



