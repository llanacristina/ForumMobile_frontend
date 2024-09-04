export type User = {
  token: string | null;
  id: string | null;
  username: string | null;
  email: string | null;
  profileURL: string | null;
  location?: string;
};

export type UserContextProps = {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
};

export interface Post {
  commentsCount: number;
  id: string;
  title: string;
  content: string;
  date: string;
  user: {
    userID: string;
    name: string;
    profileURL: string | null;
  };
}


