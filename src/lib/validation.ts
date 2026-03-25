import { z } from 'zod'

// Contact form schema
export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name is too long'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(3, 'Subject must be at least 3 characters').max(200, 'Subject is too long'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(1000, 'Message is too long'),
})

export type ContactFormData = z.infer<typeof contactFormSchema>

// Free quote form schema
export const quoteFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name is too long'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number').max(20, 'Phone number is too long'),
  monthlyBill: z.coerce.number().min(1000, 'Monthly bill must be at least LKR 1,000').max(1000000, 'Please enter a valid amount'),
  location: z.string().min(2, 'Please enter your location').max(200, 'Location is too long'),
  message: z.string().max(500, 'Message is too long').optional(),
})

export type QuoteFormData = z.infer<typeof quoteFormSchema>

// Calculator form schema
export const calculatorFormSchema = z.object({
  monthlyBill: z.coerce.number().min(1000, 'Monthly bill must be at least LKR 1,000').max(1000000, 'Please enter a valid amount'),
  roofArea: z.coerce.number().min(100, 'Roof area must be at least 100 sq ft').max(100000, 'Please enter a valid area'),
  location: z.string().min(2, 'Please enter your location').max(200, 'Location is too long'),
})

export type CalculatorFormData = z.infer<typeof calculatorFormSchema>

