export type User = {
  token: string ;
  id: string ;
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


