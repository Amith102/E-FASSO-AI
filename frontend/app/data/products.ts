export const CATEGORIES = ["All", "Men", "Women", "Accessories"];

const ADJECTIVES = ["Classic", "Vintage", "Modern", "Urban", "Elegant", "Chic", "Premium", "Rugged", "Casual", "Luxury", "Essential", "Minimalist", "Boho", "Streetwear", "Sophisticated", "Comfy", "Sleek", "Retro", "Timeless", "Bold"];

const MEN_CLOTHING_TYPES = ["T-Shirt", "Oversized Tee", "Polo", "Graphic Tee", "Streetwear Hoodie", "Casual Shirt", "Slim Fit Tee", "V-Neck", "Long Sleeve Tee", "Muscle Tee"];
const WOMEN_CLOTHING_TYPES = ["Dress", "Top", "Skirt", "Blouse", "Gown", "Maxi", "Jacket", "Coat", "Jeans", "Leggings", "Sweater", "Cardigan", "Jumpsuit", "Romper", "Tunic"];
const ACCESSORIES_TYPES = ["Watch", "Bag", "Sunglasses", "Belt", "Wallet", "Hat", "Scarf", "Boots", "Sneakers", "Heels", "Totebag", "Backpack"];

// Helper to generate a deterministic random number based on a seed
const seededRandom = (seed: number) => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
};

const getProductName = (category: string, seed: number) => {
    const adj = ADJECTIVES[Math.floor(seededRandom(seed) * ADJECTIVES.length)];
    if (category === "Men") {
        const type = MEN_CLOTHING_TYPES[Math.floor(seededRandom(seed + 1) * MEN_CLOTHING_TYPES.length)];
        return `${adj} ${type}`;
    } else if (category === "Women") {
        const type = WOMEN_CLOTHING_TYPES[Math.floor(seededRandom(seed + 2) * WOMEN_CLOTHING_TYPES.length)];
        return `${adj} ${type}`;
    } else {
        const type = ACCESSORIES_TYPES[Math.floor(seededRandom(seed + 3) * ACCESSORIES_TYPES.length)];
        return `${adj} ${type}`;
    }
};

const getProductImages = (name: string, category: string, seed: number) => {
    // robust keyword selection to avoid "cat" fallback (which happens when strict tags aren't found)
    let keywords: string[] = [];

    if (category === "Men") {
        // Updated to reflect user preference for T-shirts/Casuals
        keywords = ["t-shirt", "mens_fashion", "streetwear", "polo_shirt", "mens_clothing"];
    } else if (category === "Women") {
        keywords = ["women_fashion", "dress", "fashion_model", "elegant_dress", "summer_dress"];
    } else { // Accessories
        keywords = ["watch", "handbag", "sneakers", "sunglasses", "fashion_accessory"];
    }

    // Pick one keyword deterministically
    const keyword = keywords[seed % keywords.length];

    // Use LoremFlickr with a singlular keyword for reliability
    return [
        `https://loremflickr.com/600/800/${keyword}?lock=${seed}`,
        `https://loremflickr.com/600/800/${keyword}?lock=${seed + 100}`,
        `https://loremflickr.com/600/800/${keyword}?lock=${seed + 200}`
    ];
};

const getProductSizes = (category: string) => {
    if (category === "Accessories") return ["One Size"];
    return ["XS", "S", "M", "L", "XL", "XXL"];
};

const getProductColor = (seed: number) => {
    const hue = Math.floor(seededRandom(seed + 4) * 360);
    return `hsl(${hue}, 60%, 50%)`;
};

// Generate 600 products
export const PRODUCTS = Array.from({ length: 600 }).map((_, i) => {
    const seed = i * 9999;

    // Distribute categories evenly
    const categories = ["Men", "Women", "Accessories"];
    const category = categories[i % 3];

    const name = getProductName(category, seed);

    // Note: Use deterministic seed for stable images across reloads
    const images = getProductImages(name, category, i);

    return {
        id: i + 1,
        name: name,
        price: Math.floor(seededRandom(seed + 5) * 9500) + 500, // 500 - 10000
        category: category,
        rating: (seededRandom(seed + 6) * 2 + 3).toFixed(1), // 3.0 - 5.0
        image: images[0], // Main image for grid
        images: images,   // Array for gallery
        sizes: getProductSizes(category),
        description: `Experience the future of fashion with this ${name}. Perfectly tailored for a modern look.`,
        color: getProductColor(seed),
        matchScore: Math.floor(seededRandom(seed + 7) * 15) + 85, // 85% - 99%
    };
});
