import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Loader } from '~/src/components/Loader';
import { UserLine } from '~/src/components/UserLine';
import { UsersResponseSchema } from '~/src/schema/user.schema';
import { User } from '~/src/store/store';

const getUsers = async () =>
  fetch('/api/users')
    .then((res) => res.json())
    .then(UsersResponseSchema.parse);

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getUsers()
      .then((data) => {
        setUsers(data.users);
      })
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-4xl font-bold">Users</h1>
      <Link href="/users/new" className="bg-blue-600 p-2 w-fit rounded-full">
        New user
      </Link>
      {isLoading && <Loader />}
      {isError && <div>Something went wrong</div>}
      <ul className="flex flex-col gap-2">
        {users.map((user) => (
          <UserLine key={user.id} user={user} />
        ))}
      </ul>
    </div>
  );
}
