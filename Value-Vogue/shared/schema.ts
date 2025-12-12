import { pgTable, text, varchar, integer, jsonb, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Color schema for products
export const colorSchema = z.object({
  name: z.string(),
  hex: z.string(),
});

export type ProductColor = z.infer<typeof colorSchema>;

// Product schema
export const products = pgTable("products", {
  id: varchar("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  category: text("category").notNull(),
  price: integer("price").notNull(),
  currency: text("currency").notNull().default("INR"),
  sizes: text("sizes").array().notNull(),
  colors: jsonb("colors").$type<ProductColor[]>().notNull(),
  images: text("images").array().notNull(),
  description: text("description").notNull(),
  sku: text("sku").notNull(),
  inventory: integer("inventory").notNull().default(0),
  tags: text("tags").array().notNull(),
});

export const insertProductSchema = createInsertSchema(products).omit({ id: true });
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Product = typeof products.$inferSelect;

// User schema
export const users = pgTable("users", {
  id: varchar("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  isAdmin: boolean("is_admin").notNull().default(false),
});

export const insertUserSchema = createInsertSchema(users).omit({ id: true, isAdmin: true });
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Cart item schema
export const cartItemSchema = z.object({
  productId: z.string(),
  quantity: z.number().min(1),
  size: z.string(),
  color: colorSchema,
});

export type CartItem = z.infer<typeof cartItemSchema>;

// Inquiry schema
export const inquiries = pgTable("inquiries", {
  id: varchar("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  message: text("message").notNull(),
  productId: text("product_id"),
});

export const insertInquirySchema = createInsertSchema(inquiries).omit({ id: true });
export type InsertInquiry = z.infer<typeof insertInquirySchema>;
export type Inquiry = typeof inquiries.$inferSelect;

// Order schema
export const orders = pgTable("orders", {
  id: varchar("id").primaryKey(),
  userId: text("user_id"),
  items: jsonb("items").$type<CartItem[]>().notNull(),
  total: integer("total").notNull(),
  status: text("status").notNull().default("pending"),
  shippingAddress: jsonb("shipping_address").$type<{
    name: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    phone: string;
  }>().notNull(),
  paymentMethod: text("payment_method").notNull(),
});

export const insertOrderSchema = createInsertSchema(orders).omit({ id: true, status: true });
export type InsertOrder = z.infer<typeof insertOrderSchema>;
export type Order = typeof orders.$inferSelect;

// Checkout form schema
export const checkoutFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone must be at least 10 digits"),
  address: z.string().min(10, "Address must be at least 10 characters"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  pincode: z.string().min(6, "Valid pincode required"),
  paymentMethod: z.enum(["cod", "card", "upi"]),
});

export type CheckoutFormData = z.infer<typeof checkoutFormSchema>;

// Login form schema
export const loginFormSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type LoginFormData = z.infer<typeof loginFormSchema>;

// Register form schema
export const registerFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export type RegisterFormData = z.infer<typeof registerFormSchema>;
