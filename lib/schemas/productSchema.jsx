import {z} from "zod";

const productSchema = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().optional(),
    quantity: z.number().int().nonnegative(),
    unit: z.string().min(1, "Unit is required"),
    assignedTasks: z.array(z.string()).optional(),
    inventory: z.number().int().nonnegative(),
    household: z.string().min(1, "Household is required")
});

const createProductSchema = productSchema.omit({ assignedTasks: true });
const updateProductSchema = productSchema.partial();
const deleteProductSchema = z.object({
    id: z.string().uuid()
});

export { productSchema, createProductSchema, updateProductSchema, deleteProductSchema };