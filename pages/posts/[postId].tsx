import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Loader } from '~/src/components/Loader';
import { PostResponseSchema } from '~/src/schema/post.schema';
import { UserResponseSchema } from '~/src/schema/user.schema';

const getPosts = async (postId: string) => {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return fetch(`/api/posts/${postId}`)
    .then((res) => res.json())
    .then(PostResponseSchema.parse);
};

const getUser = (userId: string) =>
  fetch(`/api/users/${userId}`)
    .then((res) => res.json())
    .then(UserResponseSchema.parse);

export default function UserPage() {
  const router = useRouter();

  const postId = router.query.postId as string;

  const { data, isLoading, isError } = useQuery({
    enabled: Boolean(postId),
    queryKey: ['posts', postId],
    queryFn: () => getPosts(postId),
  });

  const {
    data: user,
    isLoading: userLoading,
    isError: userError,
  } = useQuery({
    enabled: Boolean(data?.post.userId),
    queryKey: ['users', data?.post.userId],
    queryFn: () => getUser(postId),
  });

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <div>Something went wrong</div>;
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      <h1 className="text-4xl font-bold">{data.post.name}</h1>
      {userLoading && <Loader />}
      {userError && <div>Something went wrong</div>}
      {user && (
        <Link href={`/users/${user.user.id}`}>
          By <a className="hover:underline">{user.user.name}</a>
        </Link>
      )}
      <hr />
      <p>{data.post.content}</p>
    </div>
  );
}
