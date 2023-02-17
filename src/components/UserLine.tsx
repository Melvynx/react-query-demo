import Link from 'next/link';
import { User } from '../store/store';

type UserLineProps = {
  user: User;
};

export const UserLine = ({ user }: UserLineProps) => {
  return (
    <Link
      href={`/users/${user.id}`}
      className="block w-fit p-6  rounded-lg shadow bg-gray-800 border-gray-700 hover:bg-gray-700"
    >
      <h5 className="text-2xl font-bold tracking-tight text-white">{user.name}</h5>
      <p className="text-gray-400">{user.email}</p>
    </Link>
  );
};
