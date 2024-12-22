import { z } from 'zod';

const userSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    households: z.array(z.string()).optional(),
    inventories: z.array(z.string()).optional(),
    assignedTasks: z.array(z.string()).optional(),
});

const createUserSchema = userSchema;

const updateUserSchema = userSchema.partial();

const deleteUserSchema = z.object({
    email: z.string().email("Invalid email address"),
});

export { createUserSchema, updateUserSchema, deleteUserSchema };