/* ==========================================================
   THE WEBBED VAULT
   PRODUCT DATABASE
========================================================== */

const products = [

    /* ==========================================================
       MASKS
    ========================================================== */

    {
        id: 1,

        name: "Tobey Red Mask",

        category: "Masks",

        price: 85,

        badge: "Best Seller",

        featured: true,

        stock: 10,

        image: "Images/Masks/Mask-pictures/tobey-red.front.png",

        images: [
            "Images/Masks/Mask-pictures/tobey-red.front.png",
            "Images/Masks/Mask-pictures/tobey-red.eyes-close.png",
            "Images/Masks/Mask-pictures/tobey-red.side-left.png",
            "Images/Masks/Mask-pictures/tobey-red.side-right.png"
        ],

        description: "Premium Raimi-inspired full-head mask.",

        features: [
            "Raised 3D webbing",
            "Magnetic lenses",
            "Premium lycra fabric",
            "Collector quality",
            "Comfortable fit"
        ],

        shipping: "Ships within 1–2 business days.",

        returns: "30-day returns accepted."

    },

    {
        id: 2,

        name: "Black Symbiote Mask",

        category: "Masks",

        price: 85,

        badge: "Popular",

        featured: true,

        stock: 10,

        image: "Images/Masks/Mask-pictures/tobey-black.front.png",

        images: [
            "Images/Masks/Mask-pictures/tobey-black.front.png",
            "Images/Masks/Mask-pictures/tobey-black.eyes-close.png",
            "Images/Masks/Mask-pictures/tobey-black.side-left.png",
            "Images/Masks/Mask-pictures/tobey-black.side-right.png"
        ],

        description: "Black Symbiote full-head mask.",

        features: [
            "Raised 3D webbing",
            "Magnetic lenses",
            "Premium lycra fabric",
            "Collector quality",
            "Comfortable fit"
        ],

        shipping: "Ships within 1–2 business days.",

        returns: "30-day returns accepted."

    },

    {
        id: 3,

        name: "Amazing Spider V1",

        category: "Masks",

        price: 85,

        badge: "New",

        featured: true,

        stock: 10,

        image: "Images/Masks/Mask-pictures/amazing-v1.front.png",

        images: [
            "Images/Masks/Mask-pictures/amazing-v1.front.png",
            "Images/Masks/Mask-pictures/amazing-v1.eyes-close.png",
            "Images/Masks/Mask-pictures/amazing-v1.side-left.png",
            "Images/Masks/Mask-pictures/amazing-v1.close.png"
        ],

        description: "The Amazing Spider- Version 1 mask.",

        features: [
            "Raised 3D webbing",
            "Magnetic lenses",
            "Premium lycra fabric",
            "Collector quality",
            "Comfortable fit"
        ],

        shipping: "Ships within 1–2 business days.",

        returns: "30-day returns accepted."

    },

    {
        id: 4,

        name: "Amazing Spider V2",

        category: "Masks",

        price: 85,

        badge: "New",

        featured: true,

        stock: 10,

        image: "Images/Masks/Mask-pictures/amazing-v2.front.png",

        images: [
            "Images/Masks/Mask-pictures/amazing-v2.front.png",
            "Images/Masks/Mask-pictures/amazing-v2.eyes-close.png",
            "Images/Masks/Mask-pictures/amazing-v2.side-left.png",
            "Images/Masks/Mask-pictures/amazing-v2.side-right.png"
        ],

        description: "The Amazing Spider- Version 2 mask.",

        features: [
            "Raised 3D webbing",
            "Magnetic lenses",
            "Premium lycra fabric",
            "Collector quality",
            "Comfortable fit"
        ],

        shipping: "Ships within 1–2 business days.",

        returns: "30-day returns accepted."

    },

    {
        id: 5,

        name: "Spider-Verse Mask",

        category: "Masks",

        price: 70,

        badge: "Spectacular",

        featured: true,

        stock: 10,

        image: "Images/Masks/Mask-pictures/miles-front.png",

        images: [
            "Images/Masks/Mask-pictures/miles-front.png",
            "Images/Masks/Mask-pictures/miles-close.png",
            "Images/Masks/Mask-pictures/miles-side-left.png",
            "Images/Masks/Mask-pictures/miles-side-right.png"
        ],

        description: "Spider-Verse inspired full-head mask.",

        features: [
            "Raised 3D webbing",
            "Magnetic lenses",
            "Premium lycra fabric",
            "Collector quality",
            "Comfortable fit"
        ],

        shipping: "Ships within 1–2 business days.",

        returns: "30-day returns accepted."

    },

    {
        id: 6,

        name: "Brand New Day Mask",

        category: "Masks",

        price: 85,

        badge: "New Drop",

        featured: true,

        stock: 10,

        image: "Images/Masks/Mask-pictures/brand-new-day.front.png",

        images: [
            "Images/Masks/Mask-pictures/brand-new-day.front.png",
            "Images/Masks/Mask-pictures/brand-new-day.eyes-close.png",
            "Images/Masks/Mask-pictures/brand-new-day.side-left.png",
            "Images/Masks/Mask-pictures/brand-new-day.close.png"
        ],

        description: "Inspired by:Brand New Day.",

        features: [
            "Raised 3D webbing",
            "Magnetic lenses",
            "Premium lycra fabric",
            "Collector quality",
            "Comfortable fit"
        ],

        shipping: "Ships within 1–2 business days.",

        returns: "30-day returns accepted."

    },

    /* ==========================================================
       GLOVES
    ========================================================== */

    {
        id: 7,

        name: "Black Spider Gloves",

        category: "Gloves",

        price: 45,

        badge: "Popular",

        featured: false,

        stock: 10,

        image: "Images/Gloves/symbiote-gloves.webp",

        images: [
            "Images/Gloves/symbiote-gloves.webp"
        ],

        description: "Black Symbiote suit gloves.",

        features: [
            "Premium fabric",
            "Screen accurate design",
            "Comfortable fit",
            "Collector quality",
            "Perfect for cosplay"
        ],

        shipping: "Ships within 1–2 business days.",

        returns: "30-day returns accepted."

    },

    {
        id: 8,

        name: "Amazing 1 Gloves",

        category: "Gloves",

        price: 60,

        badge: "Amazing",

        featured: false,

        stock: 10,

        image: "Images/Gloves/amazing-v1gloves.webp",

        images: [
            "Images/Gloves/amazing-v1gloves.webp"
        ],

        description: "The Amazing Spider 1 gloves.",

        features: [
            "Premium fabric",
            "Screen accurate design",
            "Comfortable fit",
            "Collector quality",
            "Perfect for cosplay"
        ],

        shipping: "Ships within 1–2 business days.",

        returns: "30-day returns accepted."

    },

    {
        id: 9,

        name: "Amazing 2 Gloves",

        category: "Gloves",

        price: 60,

        badge: "Amazing",

        featured: true,

        stock: 10,

        image: "Images/Gloves/amazing-v2gloves.webp",

        images: [
            "Images/Gloves/amazing-v2gloves.webp"
        ],

        description: "The Amazing Spider 2 gloves.",

        features: [
            "Premium fabric",
            "Screen accurate design",
            "Comfortable fit",
            "Collector quality",
            "Perfect for cosplay"
        ],

        shipping: "Ships within 1–2 business days.",

        returns: "30-day returns accepted."

    },

    {
        id: 10,

        name: "Tobey Red Gloves",

        category: "Gloves",

        price: 60,

        badge: "Popular",

        featured: false,

        stock: 10,

        image: "Images/Gloves/tobey-red-gloves.webp",

        images: [
            "Images/Gloves/tobey-red-gloves.webp"
        ],

        description: "Raimi Spider gloves.",

        features: [
            "Premium fabric",
            "Screen accurate design",
            "Comfortable fit",
            "Collector quality",
            "Perfect for cosplay"
        ],

        shipping: "Ships within 1–2 business days.",

        returns: "30-day returns accepted."

    },

    /* ==========================================================
       WEB SHOOTERS
    ========================================================== */

    {
        id: 11,

        name: "Web Shooters",

        category: "Web Shooters",

        price: 90,

        badge: "Collector",

        featured: false,

        stock: 10,

        image: "Images/Webshooters/webshooters.webp",

        images: [
            "Images/Webshooters/webshooters.webp"
        ],

        description: "Classic Spider web shooters.",

        features: [
            "Detailed design",
            "Collector quality",
            "Lightweight",
            "Display worthy",
            "Perfect for cosplay"
        ],

        shipping: "Ships within 1–2 business days.",

        returns: "30-day returns accepted."

    },

    {
        id: 12,

        name: "Amazing 2 Web Shooters",

        category: "Web Shooters",

        price: 45,

        badge: "Best Seller",

        featured: true,

        stock: 10,

        image: "Images/Webshooters/tasm2-webshooters.webp",

        images: [
            "Images/Webshooters/tasm2-webshooters.webp"
        ],

        description: "Amazing Spider 2 web shooters.",

        features: [
            "Detailed design",
            "Collector quality",
            "Lightweight",
            "Display worthy",
            "Perfect for cosplay"
        ],

        shipping: "Ships within 1–2 business days.",

        returns: "30-day returns accepted."

    },

    {
        id: 13,

        name: "Brand New Day Web Shooters",

        category: "Web Shooters",

        price: 45,

        badge: "New Drop",

        featured: true,

        stock: 10,

        image: "Images/Webshooters/bnd-webshooters.webp",

        images: [
            "Images/Webshooters/bnd-webshooters.webp"
        ],

        description: "Brand New Day inspired web shooters.",

        features: [
            "Detailed design",
            "Collector quality",
            "Lightweight",
            "Display worthy",
            "Perfect for cosplay"
        ],

        shipping: "Ships within 1–2 business days.",

        returns: "30-day returns accepted."

    },

    /* ==========================================================
       ACCESSORIES
    ========================================================== */ 
      {
        id: 14,

        name: "Amazing 2 Bag",

        category: "Accessories",

        price: 70,

        badge: "Collector",

        featured: false,

        stock: 10,

        image: "Images/Accessories/tasm2-bag.webp",

        images: [
            "Images/Accessories/tasm2-bag.webp"
        ],

        description: "Movie display bag.",

        features: [
            "Premium quality",
            "Collector edition",
            "Inspired by the film",
            "Durable construction",
            "Perfect display piece"
        ],

        shipping: "Ships within 1–2 business days.",

        returns: "30-day returns accepted."

    }

];

/* ==========================================================
   PROTECT PRODUCT DATABASE
========================================================== */

Object.freeze(products);

products.forEach(product => {

    Object.freeze(product);

});
  
  