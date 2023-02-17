import { z } from 'zod';

export const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
});

export const UsersSchema = z.array(UserSchema);

export const UsersResponseSchema = z.object({
  users: UsersSchema,
});

export const UserResponseSchema = z.object({
  user: UserSchema,
});
