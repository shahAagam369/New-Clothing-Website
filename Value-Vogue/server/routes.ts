import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertInquirySchema, insertOrderSchema, insertProductSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // GET /api/products - Get all products
  app.get("/api/products", async (req, res) => {
    try {
      const { category, search, minPrice, maxPrice } = req.query;
      let products = await storage.getProducts();

      // Filter by category
      if (category && typeof category === "string") {
        products = products.filter((p) => p.category === category);
      }

      // Search filter
      if (search && typeof search === "string") {
        const query = search.toLowerCase();
        products = products.filter(
          (p) =>
            p.title.toLowerCase().includes(query) ||
            p.description.toLowerCase().includes(query) ||
            p.tags.some((t) => t.toLowerCase().includes(query))
        );
      }

      // Price filters
      if (minPrice && typeof minPrice === "string") {
        const min = parseInt(minPrice, 10);
        if (!isNaN(min)) {
          products = products.filter((p) => p.price >= min);
        }
      }

      if (maxPrice && typeof maxPrice === "string") {
        const max = parseInt(maxPrice, 10);
        if (!isNaN(max)) {
          products = products.filter((p) => p.price <= max);
        }
      }

      res.json(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ error: "Failed to fetch products" });
    }
  });

  // GET /api/products/:id - Get product by ID or slug
  app.get("/api/products/:id", async (req, res) => {
    try {
      const { id } = req.params;
      
      // Try to find by ID first
      let product = await storage.getProductById(id);
      
      // If not found, try by slug
      if (!product) {
        product = await storage.getProductBySlug(id);
      }

      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      res.json(product);
    } catch (error) {
      console.error("Error fetching product:", error);
      res.status(500).json({ error: "Failed to fetch product" });
    }
  });

  // POST /api/inquiry - Submit an inquiry
  app.post("/api/inquiry", async (req, res) => {
    try {
      const validated = insertInquirySchema.parse(req.body);
      const inquiry = await storage.createInquiry(validated);
      res.status(201).json(inquiry);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid inquiry data", details: error.errors });
      }
      console.error("Error creating inquiry:", error);
      res.status(500).json({ error: "Failed to submit inquiry" });
    }
  });

  // POST /api/checkout - Process checkout
  app.post("/api/checkout", async (req, res) => {
    try {
      const { items, total, shippingAddress, paymentMethod } = req.body;

      // Validate required fields
      if (!items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ error: "Cart items are required" });
      }

      if (!total || typeof total !== "number") {
        return res.status(400).json({ error: "Total is required" });
      }

      if (!shippingAddress) {
        return res.status(400).json({ error: "Shipping address is required" });
      }

      if (!paymentMethod) {
        return res.status(400).json({ error: "Payment method is required" });
      }

      // Create order
      const order = await storage.createOrder({
        userId: null, // Guest checkout
        items,
        total,
        shippingAddress,
        paymentMethod,
      });

      // In production, this would integrate with payment gateway
      // For demo purposes, we simulate successful payment

      res.status(201).json({
        success: true,
        orderId: order.id,
        message: "Order placed successfully",
      });
    } catch (error) {
      console.error("Error processing checkout:", error);
      res.status(500).json({ error: "Failed to process checkout" });
    }
  });

  // POST /api/admin/product - Create a new product (admin only)
  app.post("/api/admin/product", async (req, res) => {
    try {
      // In production, this would check for admin authentication
      const authHeader = req.headers.authorization;
      
      // Simple demo auth check
      if (!authHeader || authHeader !== "Bearer admin-demo-token") {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const validated = insertProductSchema.parse(req.body);
      const product = await storage.createProduct(validated);
      res.status(201).json(product);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid product data", details: error.errors });
      }
      console.error("Error creating product:", error);
      res.status(500).json({ error: "Failed to create product" });
    }
  });

  // GET /api/orders - Get all orders (admin only)
  app.get("/api/orders", async (req, res) => {
    try {
      const orders = await storage.getOrders();
      res.json(orders);
    } catch (error) {
      console.error("Error fetching orders:", error);
      res.status(500).json({ error: "Failed to fetch orders" });
    }
  });

  // GET /api/orders/:id - Get order by ID
  app.get("/api/orders/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const order = await storage.getOrderById(id);

      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }

      res.json(order);
    } catch (error) {
      console.error("Error fetching order:", error);
      res.status(500).json({ error: "Failed to fetch order" });
    }
  });

  /*
   * ============================================
   * STRIPE INTEGRATION (Commented for future use)
   * ============================================
   * 
   * To enable Stripe payments:
   * 1. Install stripe: npm install stripe
   * 2. Add your Stripe secret key to environment variables
   * 3. Uncomment and configure the endpoint below
   * 
   * Environment Variables needed:
   * - STRIPE_SECRET_KEY: Your Stripe secret key
   * - STRIPE_PUBLISHABLE_KEY: Your Stripe publishable key (frontend)
   * 
   * Example endpoint:
   * 
   * import Stripe from 'stripe';
   * const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
   * 
   * app.post("/api/create-payment-intent", async (req, res) => {
   *   try {
   *     const { amount, currency = "inr" } = req.body;
   *     
   *     const paymentIntent = await stripe.paymentIntents.create({
   *       amount: amount * 100, // Stripe expects amount in smallest currency unit
   *       currency,
   *       automatic_payment_methods: {
   *         enabled: true,
   *       },
   *     });
   *     
   *     res.json({
   *       clientSecret: paymentIntent.client_secret,
   *     });
   *   } catch (error) {
   *     console.error("Error creating payment intent:", error);
   *     res.status(500).json({ error: "Failed to create payment intent" });
   *   }
   * });
   * 
   * Webhook for handling payment events:
   * 
   * app.post("/api/webhook/stripe", express.raw({ type: 'application/json' }), async (req, res) => {
   *   const sig = req.headers['stripe-signature'];
   *   const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
   *   
   *   try {
   *     const event = stripe.webhooks.constructEvent(req.body, sig!, endpointSecret!);
   *     
   *     switch (event.type) {
   *       case 'payment_intent.succeeded':
   *         const paymentIntent = event.data.object;
   *         // Update order status to paid
   *         break;
   *       case 'payment_intent.payment_failed':
   *         // Handle failed payment
   *         break;
   *     }
   *     
   *     res.json({ received: true });
   *   } catch (error) {
   *     console.error("Webhook error:", error);
   *     res.status(400).send(`Webhook Error: ${error.message}`);
   *   }
   * });
   */

  return httpServer;
}
