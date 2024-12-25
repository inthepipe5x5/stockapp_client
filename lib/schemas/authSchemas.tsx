import { z } from "zod";

const loginSchema = z.object({
    email: z.string().min(1, "Email is required").email(),
    provider: z.enum()
    // password: z.string().min(1, "Password is required"),
    rememberme: z.boolean().optional(),
  });

const signUpSchema = z.object({
    email: z.string().min(1, "Email is required").email(),
    name: z.string().min(1, "Name is required"),  
});

type LoginSchemaType = z.infer<typeof loginSchema>;

export { loginSchema, LoginSchemaType, signUpSchema };