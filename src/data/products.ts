export interface Product {
  id: string;
  name: string;
  category: "biodegradable" | "spices";
  status: "active" | "coming_soon";
  description: string;
  image?: string;
  features?: string[];
}

export const PRODUCTS_DATA: Product[] = [
  // --- 1. Sustainable Food & Hospitality Packaging ---
  {
    id: "butter-paper",
    name: "Butter Paper / Greaseproof Paper",
    category: "biodegradable",
    status: "active",
    description: "High-quality greaseproof paper ideal for wrapping food items, baking, and restaurant packaging.",
  },
  {
    id: "food-aluminium-roll",
    name: "Food Aluminium Roll",
    category: "biodegradable",
    status: "active",
    description: "Reliable food-grade aluminum rolls designed for commercial and kitchen freshness preservation.",
  },
  {
    id: "aluminium-foil",
    name: "Aluminium Foil",
    category: "biodegradable",
    status: "active",
    description: "Heavy-duty aluminum foil sheets and rolls for food service and hospitality packaging.",
  },
  {
    id: "paper-plates",
    name: "Paper Plates",
    category: "biodegradable",
    status: "active",
    description: "Sturdy eco-friendly paper plates suitable for events, catering, and daily hospitality use.",
  },
  {
    id: "paper-bowls",
    name: "Paper Bowls",
    category: "biodegradable",
    status: "active",
    description: "Leak-resistant paper bowls designed for soups, desserts, and side dishes.",
  },
  {
    id: "areca-leaf-plates",
    name: "Areca Leaf Plates",
    category: "biodegradable",
    status: "active",
    description: "100% natural, elegant, and compostable plates crafted from fallen Areca palm leaves.",
  },
  {
    id: "areca-leaf-bowls",
    name: "Areca Leaf Bowls",
    category: "biodegradable",
    status: "active",
    description: "Sustainable natural palm leaf bowls offering an aesthetic touch to eco-conscious dining.",
  },
  {
    id: "paper-cups",
    name: "Paper Cups",
    category: "biodegradable",
    status: "active",
    description: "Insulated paper cups for hot and cold beverages in cafes, offices, and events.",
  },
  {
    id: "bagasse-plates",
    name: "Bagasse Plates",
    category: "biodegradable",
    status: "active",
    description: "Sugarcane bagasse plates that are sturdy, microwave-safe, and fully compostable.",
  },
  {
    id: "bagasse-bowls",
    name: "Bagasse Bowls",
    category: "biodegradable",
    status: "active",
    description: "Eco-friendly bagasse bowls providing a durable alternative to single-use plastics.",
  },
  {
    id: "bagasse-containers",
    name: "Bagasse Containers",
    category: "biodegradable",
    status: "active",
    description: "Hinged and multi-compartment bagasse food containers for takeaway and meal delivery.",
  },
  {
    id: "eco-biryani-boxes",
    name: "Eco Biryani Boxes",
    category: "biodegradable",
    status: "active",
    description: "Spacious, heat-retaining eco-friendly boxes crafted specifically for biryani and large portions.",
  },
  {
    id: "pp-food-containers",
    name: "PP Food Containers",
    category: "biodegradable",
    status: "active",
    description: "Durable food-grade polypropylene containers for secure food packaging.",
  },
  {
    id: "eco-cutlery",
    name: "Eco Cutlery",
    category: "biodegradable",
    status: "active",
    description: "Wooden and biodegradable forks, spoons, and knives designed for sustainable dining.",
  },
  {
    id: "paper-straws",
    name: "Paper Straws",
    category: "biodegradable",
    status: "active",
    description: "Durable multi-layer paper straws that stay firm in beverages without sogginess.",
  },
  {
    id: "bamboo-straws",
    name: "Bamboo Straws",
    category: "biodegradable",
    status: "active",
    description: "Reusable, natural bamboo straws providing an upscale eco-friendly drinking experience.",
  },
  {
    id: "paper-bags",
    name: "Paper Bags",
    category: "biodegradable",
    status: "active",
    description: "Recyclable twisted-handle and flat-handle paper carry bags for retail and food takeout.",
  },
  {
    id: "compostable-carry-bags",
    name: "Biodegradable / Compostable Carry Bags",
    category: "biodegradable",
    status: "active",
    description: "Certified compostable carry bags built to handle heavy retail and hospitality loads.",
  },

  // --- 2. Hospitality Tissue & Paper Products ---
  {
    id: "facial-tissue",
    name: "Facial Tissue",
    category: "biodegradable",
    status: "active",
    description: "Soft, absorbent facial tissues packaged for hotels, restaurants, and corporate washrooms.",
  },
  {
    id: "table-napkins",
    name: "Table Napkins",
    category: "biodegradable",
    status: "active",
    description: "High-quality paper napkins designed for fine dining and restaurant tables.",
  },
  {
    id: "cocktail-napkins",
    name: "Cocktail Napkins",
    category: "biodegradable",
    status: "active",
    description: "Compact, absorbent cocktail napkins ideal for bars, cafes, and lounges.",
  },
  {
    id: "toilet-rolls",
    name: "Toilet Rolls",
    category: "biodegradable",
    status: "active",
    description: "Reliable, soft multi-ply tissue rolls for commercial and hospitality restrooms.",
  },
  {
    id: "kitchen-rolls",
    name: "Kitchen Rolls",
    category: "biodegradable",
    status: "active",
    description: "Highly absorbent multi-purpose kitchen towel rolls for heavy-duty food prep cleaning.",
  },

  // --- 3. Cleaning & Kitchen Hygiene ---
  {
    id: "phenyl",
    name: "Phenyl",
    category: "biodegradable",
    status: "active",
    description: "Effective floor cleaner and disinfectant designed for commercial kitchen and facility hygiene.",
  },
  {
    id: "dishwash",
    name: "Dishwash",
    category: "biodegradable",
    status: "active",
    description: "Powerful grease-cutting dishwash liquid and bars for commercial hospitality kitchens.",
  },

  // --- 4. Waste Management ---
  {
    id: "garbage-bags",
    name: "Garbage Bags & Compostable Bags",
    category: "biodegradable",
    status: "active",
    description: "Durable standard and certified compostable garbage bags for efficient waste management.",
  },

  // --- 5. Food & Beverage Sachets ---
  {
    id: "tea-sachets",
    name: "Tea Sachets",
    category: "biodegradable",
    status: "active",
    description: "Single-serve tea bags packaged neatly for hotels, guest rooms, and catering setups.",
  },
  {
    id: "coffee-sachets",
    name: "Coffee Sachets",
    category: "biodegradable",
    status: "active",
    description: "Instant coffee single-serve portions for hospitality hospitality and office pantries.",
  },
  {
    id: "milk-powder-sachets",
    name: "Milk Powder Sachets",
    category: "biodegradable",
    status: "active",
    description: "Convenient single-serve dairy creamer and milk powder packets.",
  },

  // --- Spices (Coming Soon) ---
  {
    id: "pure-turmeric-powder",
    name: "Pure Turmeric Powder",
    category: "spices",
    status: "coming_soon",
    description: "Authentic, high-curcumin kitchen turmeric powder sourced directly from trusted farms.",
  },
  {
    id: "kashmiri-chilli-powder",
    name: "Kashmiri Chilli Powder",
    category: "spices",
    status: "coming_soon",
    description: "Vibrant red, aromatic Kashmiri chili powder providing rich color and mild heat.",
  },
  {
    id: "cumin-powder",
    name: "Cumin Powder (Jeera)",
    category: "spices",
    status: "coming_soon",
    description: "Finely ground roasted cumin seeds with a rich earthy aroma.",
  },
  {
    id: "coriander-powder",
    name: "Coriander Powder (Dhania)",
    category: "spices",
    status: "coming_soon",
    description: "Freshly milled coriander powder offering a warm, citrusy flavor profile.",
  },
];