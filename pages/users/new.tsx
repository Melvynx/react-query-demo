import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { Input } from '~/src/components/Input';
import { UserResponseSchema } from '~/src/schema/user.schema';
import { User } from '~/src/store/store';

export default function CreateUser() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (user: Omit<User, 'id'>) =>
      fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify(user),
      })
        .then((res) => res.json())
        .then(UserResponseSchema.parse),
    onSuccess: (data) => {
      queryClient.invalidateQueries(['users']);
      router.push(`/`);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const user = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
    };

    mutation.mutate(user);
  };

  return (
    <form className="flex flex-col gap-4 p-4" onSubmit={handleSubmit}>
      <h2 className="text-2xl">Create</h2>
      <Input label="Name" name="name" />
      <Input label="Email" name="email" />
      <button type="submit" className="bg-blue-600 p-2 w-fit rounded-full">
        New user
      </button>
      {mutation.isLoading ? 'Loading...' : null}
    </form>
  );
}
