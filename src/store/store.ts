import * as fs from 'fs';
import path from 'path';

const storeFolderPath = path.join(process.cwd(), '/src/store');
const storePath = path.join(storeFolderPath, 'store.txt');

const saveStore = async (store: Store) => {
  await wait(100);
  fs.writeFileSync(storePath, JSON.stringify(store));
};

const readStore = async () => {
  await wait(100);
  const data = fs.readFileSync(storePath, 'utf-8');
  try {
    return JSON.parse(data) as Store;
  } catch {
    return {
      users: [],
      posts: [],
    };
  }
};

/*

This is a fake database. Don't use this method in client side !

*/

export type User = {
  id: number;
  name: string;
  email: string;
};

export type Post = {
  id: number;
  name: string;
  content: string;
  userId: number;
};

const wait = async (ms: number) => new Promise((r) => setTimeout(r, ms));

type Store = {
  users: User[];
  posts: Post[];
};

const getStore = async (): Promise<Store> => {
  return readStore();
};

const getUsers = async () => {
  const STORE = await getStore();

  await wait(100);
  return [...STORE.users];
};

const byId = async (id: number) => {
  const STORE = await getStore();
  await wait(500);

  const user = STORE.users.find((u) => u.id === id);

  return user;
};

const addUser = async (user: Omit<User, 'id'>) => {
  const STORE = await getStore();

  await wait(100);

  const newUser = {
    id: (STORE.users.at(-1)?.id ?? 0) + 1,
    ...user,
  };

  STORE.users = [...STORE.users, newUser];
  await saveStore(STORE);

  return newUser;
};

const updateUser = async (user: User) => {
  const STORE = await getStore();
  await wait(100);

  const index = STORE.users.findIndex((u) => u.id === user.id);

  if (index === -1) {
    throw new Error('User not found');
  }

  STORE.users[index] = user;
  await saveStore(STORE);

  return [...STORE.users];
};

const deleteUser = async (id: number) => {
  const STORE = await getStore();
  await wait(100);

  STORE.users = STORE.users.filter((u) => u.id !== id);
  await saveStore(STORE);

  return [...STORE.users];
};

const postById = async (id: number) => {
  const STORE = await getStore();

  await wait(100);

  const post = STORE.posts.find((p) => p.id === id);

  return post;
};

const allPosts = async () => {
  const STORE = await getStore();

  await wait(100);

  return [...STORE.posts];
};

export const postByUserId = async (userId: number) => {
  const STORE = await getStore();

  await wait(100);

  const posts = STORE.posts.filter((p) => p.userId === userId);

  return posts;
};

export const db = {
  users: {
    all: getUsers,
    add: addUser,
    byId: byId,
    update: updateUser,
    delete: deleteUser,
  },
  posts: {
    byId: postById,
    all: allPosts,
    byUserId: postByUserId,
  },
};
