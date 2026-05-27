import { z } from 'zod'
import { formatNumberWithDecimal } from './utils'

const currency = z.string().refine(val => /^\d+(\.\d{2})?$/.test(formatNumberWithDecimal(Number(val))), {
  message: 'Price must be a valid number with up to 2 decimal places',
})

// Schema for inserting products
export const insertProductSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters long'),
  slug: z.string().min(3, 'Slug must be at least 3 characters long'),
  category: z.string().min(3, 'Category must be at least 3 characters long'),
  brand: z.string().min(3, 'Brand must be at least 3 characters long'),
  description: z.string().min(10, 'Description must be at least 10 characters long'),
  stock: z.coerce.number(),
  images: z.array(z.string()).min(1, 'At least one image is required'),
  isFeatured: z.boolean().default(false),
  banner: z.string().nullable(),
  price: currency,
})

// Schema for signing in user
export const signInFormSchema = z.object({
  email: z.string().trim().toLowerCase().pipe(z.email('Invalid email address')),
  password: z.string().min(6, 'Password must be at least six characters')
})

// Schema for signing up user
export const signUpFormSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  email: z.string().trim().toLowerCase().pipe(z.email('Invalid email address')),
  password: z.string().min(6, 'Password must be at least six characters'),
  confirmPassword: z.string().min(6, 'Confirm password must be at least six characters')
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ['confirmPassword']
})