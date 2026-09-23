/* eslint-disable @typescript-eslint/no-explicit-any */
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import connectDB from "../src/lib/db";
import Category from "../src/models/Category";
import Product from "../src/models/Product";

const seedData = async () => {
  try {
    await connectDB();
    console.log("🌱 Starting Database Seeding...");

    // Clear existing data
    await Product.deleteMany({});
    await Category.deleteMany({});
    console.log("🧹 Cleared existing categories and products.");

    // 1. Seed the 2 required Categories
    const categoriesData = [
      {
        name: "Eco Friendly",
        slug: "eco-friendly",
        description: "Sustainable food packaging, hospitality consumables, paper products, and eco-friendly alternatives.",
        isActive: true,
      },
      {
        name: "Spices",
        slug: "spices",
        description: "Pure, high-grade culinary spices including turmeric and chilli powder.",
        isActive: true,
      },
    ];

    const createdCategories = await Category.insertMany(categoriesData);
    console.log(`✅ Inserted ${createdCategories.length} categories.`);

    // Map categories by slug for easy lookup
    const catMap: { [key: string]: any } = {};
    createdCategories.forEach((cat) => {
      catMap[cat.slug] = cat._id;
    });

    // 2. Seed Products assigned to the 2 categories
    const productsData = [
      // --- CATEGORY 1: Eco Friendly ---
      {
        name: "Butter Paper / Greaseproof Paper",
        slug: "butter-paper-greaseproof-paper",
        description: "High-quality greaseproof paper for food wrapping and baking.",
        category: catMap["eco-friendly"],
        price: 150,
        stock: 500,
        status: "Published",
        images: [],
      },
      {
        name: "Food Aluminium Roll",
        slug: "food-aluminium-roll",
        description: "Heavy-duty food grade aluminium foil roll for commercial kitchens.",
        category: catMap["eco-friendly"],
        price: 250,
        stock: 300,
        status: "Published",
        images: [],
      },
      {
        name: "Aluminium Foil",
        slug: "aluminium-foil",
        description: "Standard aluminium foil sheets and containers.",
        category: catMap["eco-friendly"],
        price: 220,
        stock: 300,
        status: "Published",
        images: [],
      },
      {
        name: "Paper Plates",
        slug: "paper-plates",
        description: "Durable eco-friendly paper plates for catering and events.",
        category: catMap["eco-friendly"],
        price: 100,
        stock: 1000,
        status: "Published",
        images: [],
      },
      {
        name: "Paper Bowls",
        slug: "paper-bowls",
        description: "Leak-proof paper bowls suitable for soups and desserts.",
        category: catMap["eco-friendly"],
        price: 120,
        stock: 800,
        status: "Published",
        images: [],
      },
      {
        name: "Areca Leaf Plates",
        slug: "areca-leaf-plates",
        description: "100% natural and biodegradable areca palm leaf plates.",
        category: catMap["eco-friendly"],
        price: 350,
        stock: 400,
        isFeatured: true,
        status: "Published",
        images: [],
      },
      {
        name: "Areca Leaf Bowls",
        slug: "areca-leaf-bowls",
        description: "Eco-friendly disposable bowls crafted from natural areca leaves.",
        category: catMap["eco-friendly"],
        price: 300,
        stock: 400,
        status: "Published",
        images: [],
      },
      {
        name: "Paper Cups",
        slug: "paper-cups",
        description: "Disposable paper cups for hot and cold beverages.",
        category: catMap["eco-friendly"],
        price: 180,
        stock: 1200,
        status: "Published",
        images: [],
      },
      {
        name: "Bagasse Plates",
        slug: "bagasse-plates",
        description: "Compostable sugarcane bagasse plates for sustainable dining.",
        category: catMap["eco-friendly"],
        price: 280,
        stock: 600,
        status: "Published",
        images: [],
      },
      {
        name: "Bagasse Bowls",
        slug: "bagasse-bowls",
        description: "Eco-friendly bagasse bowls built for durability and heat retention.",
        category: catMap["eco-friendly"],
        price: 260,
        stock: 600,
        status: "Published",
        images: [],
      },
      {
        name: "Bagasse Containers",
        slug: "bagasse-containers",
        description: "Hinged and multi-compartment bagasse food containers.",
        category: catMap["eco-friendly"],
        price: 400,
        stock: 500,
        isFeatured: true,
        status: "Published",
        images: [],
      },
      {
        name: "Eco Biryani Boxes",
        slug: "eco-biryani-boxes",
        description: "Sturdy, grease-resistant eco-friendly packaging boxes designed specifically for biryani and meals.",
        category: catMap["eco-friendly"],
        price: 450,
        stock: 450,
        isFeatured: true,
        status: "Published",
        images: [],
      },
      {
        name: "PP Food Containers",
        slug: "pp-food-containers",
        description: "Microwave-safe polypropylene food containers for delivery and storage.",
        category: catMap["eco-friendly"],
        price: 350,
        stock: 700,
        status: "Published",
        images: [],
      },
      {
        name: "Eco Cutlery",
        slug: "eco-cutlery",
        description: "Biodegradable forks, spoons, and knives made from sustainable materials.",
        category: catMap["eco-friendly"],
        price: 150,
        stock: 900,
        status: "Published",
        images: [],
      },
      {
        name: "Paper Straws",
        slug: "paper-straws",
        description: "Eco-friendly, durable paper drinking straws that don't get soggy quickly.",
        category: catMap["eco-friendly"],
        price: 90,
        stock: 1500,
        status: "Published",
        images: [],
      },
      {
        name: "Bamboo Straws",
        slug: "bamboo-straws",
        description: "Reusable, natural bamboo straws for premium beverage service.",
        category: catMap["eco-friendly"],
        price: 200,
        stock: 300,
        status: "Published",
        images: [],
      },
      {
        name: "Paper Bags",
        slug: "paper-bags",
        description: "Recyclable brown and white paper bags with handles for retail and food takeout.",
        category: catMap["eco-friendly"],
        price: 250,
        stock: 800,
        status: "Published",
        images: [],
      },
      {
        name: "Biodegradable / Compostable Carry Bags",
        slug: "biodegradable-compostable-carry-bags",
        description: "Certified eco-friendly carry bags that break down naturally.",
        category: catMap["eco-friendly"],
        price: 300,
        stock: 1000,
        status: "Published",
        images: [],
      },
      {
        name: "Facial Tissue",
        slug: "facial-tissue",
        description: "Soft, absorbent facial tissues packaged for hospitality and rooms.",
        category: catMap["eco-friendly"],
        price: 80,
        stock: 1000,
        status: "Published",
        images: [],
      },
      {
        name: "Table Napkins",
        slug: "table-napkins",
        description: "Quality paper table napkins for restaurants and dining tables.",
        category: catMap["eco-friendly"],
        price: 70,
        stock: 1200,
        status: "Published",
        images: [],
      },
      {
        name: "Cocktail Napkins",
        slug: "cocktail-napkins",
        description: "Small, absorbent cocktail napkins for bars and lounges.",
        category: catMap["eco-friendly"],
        price: 50,
        stock: 1500,
        status: "Published",
        images: [],
      },
      {
        name: "Toilet Rolls",
        slug: "toilet-rolls",
        description: "Soft and hygienic tissue toilet rolls for commercial and hospitality washrooms.",
        category: catMap["eco-friendly"],
        price: 180,
        stock: 800,
        status: "Published",
        images: [],
      },
      {
        name: "Kitchen Rolls",
        slug: "kitchen-rolls",
        description: "Multi-layered high-absorbency kitchen towel rolls.",
        category: catMap["eco-friendly"],
        price: 120,
        stock: 600,
        status: "Published",
        images: [],
      },
      {
        name: "Phenyl",
        slug: "phenyl",
        description: "Commercial-strength surface disinfectant and floor cleaner phenyl.",
        category: catMap["eco-friendly"],
        price: 160,
        stock: 400,
        status: "Published",
        images: [],
      },
      {
        name: "Dishwash",
        slug: "dishwash",
        description: "Heavy-duty grease-cutting liquid dishwash for professional kitchens.",
        category: catMap["eco-friendly"],
        price: 210,
        stock: 500,
        status: "Published",
        images: [],
      },
      {
        name: "Garbage Bags",
        slug: "garbage-bags",
        description: "Durable, tear-resistant heavy-duty garbage bags for waste handling.",
        category: catMap["eco-friendly"],
        price: 140,
        stock: 800,
        status: "Published",
        images: [],
      },
      {
        name: "Biodegradable / Compostable Garbage Bags",
        slug: "biodegradable-compostable-garbage-bags",
        description: "Eco-conscious compostable trash bags designed for sustainable waste management.",
        category: catMap["eco-friendly"],
        price: 220,
        stock: 600,
        isFeatured: true,
        status: "Published",
        images: [],
      },
      {
        name: "Tea Sachets",
        slug: "tea-sachets",
        description: "Single-serve premium tea bags/sachets for hotel rooms and catering.",
        category: catMap["eco-friendly"],
        price: 150,
        stock: 1000,
        status: "Published",
        images: [],
      },
      {
        name: "Coffee Sachets",
        slug: "coffee-sachets",
        description: "Instant coffee single-serve packets for hospitality room service.",
        category: catMap["eco-friendly"],
        price: 180,
        stock: 1000,
        status: "Published",
        images: [],
      },
      {
        name: "Milk Powder Sachets",
        slug: "milk-powder-sachets",
        description: "Convenient single-serve milk powder sachets for tea and coffee pairing.",
        category: catMap["eco-friendly"],
        price: 130,
        stock: 1000,
        status: "Published",
        images: [],
      },

      // --- CATEGORY 2: Spices ---
      {
        name: "Turmeric Powder",
        slug: "turmeric-powder",
        description: "Pure, high-grade aromatic turmeric powder with rich color and quality.",
        category: catMap["spices"],
        price: 200,
        stock: 500,
        isFeatured: true,
        status: "Published",
        images: [],
      },
      {
        name: "Chilli Powder",
        slug: "chilli-powder",
        description: "Premium red chilli powder offering vibrant color and authentic heat.",
        category: catMap["spices"],
        price: 240,
        stock: 500,
        isFeatured: true,
        status: "Published",
        images: [],
      },
    ];

    const createdProducts = await Product.insertMany(productsData);
    console.log(`✅ Inserted ${createdProducts.length} products successfully into Eco Friendly and Spices categories!`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding Error:", error);
    process.exit(1);
  }
};

seedData();