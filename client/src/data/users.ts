// client/src/data/users.ts

export interface User {
  id: string;
  username: string;
  email: string;
  isAdmin: boolean;
}

// A little in-memory seed data
export const mockUsers: User[] = [
  {
    id: "1",
    username: "alice",
    email: "alice@example.com",
    isAdmin: false,
  },
  {
    id: "2",
    username: "bob",
    email: "bob@example.com",
    isAdmin: true,
  },
  {
    id: "3",
    username: "carol",
    email: "carol@example.com",
    isAdmin: false,
  },
];
