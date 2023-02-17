import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Loader } from '~/src/components/Loader';
import { PostsResponseSchema } from '~/src/schema/post.schema';
import { UserResponseSchema } from '~/src/schema/user.schema';

const getUser = (userId: number) =>
  fetch(`/api/users/${userId}`)
    .then((res) => res.json())
    .then(UserResponseSchema.parse);

const getUserPosts = (userId: number) =>
  fetch(`/api/users/${userId}/posts`)
    .then((res) => res.json())
    .then(PostsResponseSchema.parse);

export default function UserPage() {
  const router = useRouter();

  const userId = router.query.userId;

  const { data, isLoading, isError } = useQuery({
    enabled: Boolean(userId),
    queryKey: ['users', userId],
    queryFn: () => getUser(Number(userId)),
  });

  const {
    data: posts,
    isLoading: postsLoading,
    isError: postsError,
  } = useQuery({
    enabled: Boolean(userId),
    queryKey: ['users', userId, 'posts'],
    queryFn: () => getUserPosts(Number(userId)),
  });

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <div>Something went wrong</div>;
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      <h1 className="text-4xl font-bold">{data.user.name}</h1>
      <p>{data.user.email}</p>
      <hr />
      <h2 className="text-2xl font-bold">Posts</h2>
      <ul className="flex flex-col gap-2 list-disc p-4">
        {postsLoading && <Loader />}
        {postsError && <div>Something went wrong</div>}
        {posts?.posts.map((post) => (
          <li key={post.id}>
            <Link className="hover:underline" href={`/posts/${post.id}`}>
              {post.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
