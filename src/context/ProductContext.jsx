import { createContext, useContext, useState } from 'react';

const ProductContext = createContext();

export const useProducts = () => {
  return useContext(ProductContext);
};

// Mock product data
const mockProducts = [
  {
    id: 1,
    name: "HP Pavilion Gaming Laptop",
    category: "Laptop",
    price: 65999,
    description: "15.6-inch FHD, AMD Ryzen 5 5600H, 8GB RAM, 512GB SSD, NVIDIA GTX 1650",
    image: "/assets/images/laptop1.jpg",
    stock: 10
  },
  {
    id: 2,
    name: "Dell Inspiron 15",
    category: "Laptop",
    price: 49999,
    description: "15.6-inch FHD, Intel Core i5-11320H, 8GB RAM, 512GB SSD, Intel Iris Xe Graphics",
    image: "/assets/images/laptop2.jpg",
    stock: 15
  },
  {
    id: 3,
    name: "Lenovo IdeaPad Gaming 3",
    category: "Laptop",
    price: 58999,
    description: "15.6-inch FHD IPS, AMD Ryzen 5 5500H, 8GB RAM, 512GB SSD, NVIDIA GTX 1650",
    image: "/assets/images/laptop3.jpg",
    stock: 8
  },
  {
    id: 4,
    name: "ASUS TUF Gaming F15",
    category: "Laptop",
    price: 69999,
    description: "15.6-inch FHD, Intel Core i5-11400H, 16GB RAM, 512GB SSD, NVIDIA RTX 3050",
    image: "/assets/images/laptop4.jpg",
    stock: 12
  },
  {
    id: 5,
    name: "Acer Nitro 5",
    category: "Laptop",
    price: 72999,
    description: "15.6-inch FHD IPS, AMD Ryzen 7 5800H, 16GB RAM, 512GB SSD, NVIDIA RTX 3060",
    image: "/assets/images/laptop5.jpg",
    stock: 7
  },
  {
    id: 6,
    name: "Custom Gaming Desktop PC",
    category: "Desktop",
    price: 89999,
    description: "AMD Ryzen 7 5800X, 32GB RAM, 1TB SSD, NVIDIA RTX 3070, Windows 11",
    image: "/assets/images/desktop1.jpg",
    stock: 5
  },
  {
    id: 7,
    name: "Apple MacBook Air M1",
    category: "Laptop",
    price: 92999,
    description: "13.3-inch Retina Display, Apple M1 chip, 8GB RAM, 256GB SSD",
    image: "/assets/images/laptop6.jpg",
    stock: 20
  },
  {
    id: 8,
    name: "MSI GF63 Thin",
    category: "Laptop",
    price: 59999,
    description: "15.6-inch FHD, Intel Core i5-10500H, 8GB RAM, 512GB SSD, NVIDIA GTX 1650",
    image: "/assets/images/laptop7.jpg",
    stock: 9
  },
  {
    id: 9,
    name: "Intel Core i7 12700K",
    category: "Hardware",
    price: 32999,
    description: "12 cores (8P+4E), up to 5.0 GHz, LGA1700 socket, unlocked for overclocking",
    image: "/assets/images/processor1.jpg",
    stock: 15
  },
  {
    id: 10,
    name: "AMD Ryzen 9 5900X",
    category: "Hardware",
    price: 39999,
    description: "12 cores, 24 threads, up to 4.8 GHz, AM4 socket, unlocked for overclocking",
    image: "/assets/images/processor2.jpg",
    stock: 12
  },
  {
    id: 11,
    name: "NVIDIA GeForce RTX 3080",
    category: "Hardware",
    price: 79999,
    description: "10GB GDDR6X, 8704 CUDA Cores, PCIe 4.0, Ray Tracing, DLSS",
    image: "/assets/images/gpu1.jpg",
    stock: 6
  },
  {
    id: 12,
    name: "AMD Radeon RX 6800 XT",
    category: "Hardware",
    price: 69999,
    description: "16GB GDDR6, 4608 Stream Processors, PCIe 4.0, Ray Tracing",
    image: "/assets/images/gpu2.jpg",
    stock: 8
  },
  {
    id: 13,
    name: "Crucial 32GB DDR4 RAM",
    category: "Hardware",
    price: 9999,
    description: "32GB (16GBx2) DDR4-3200 MHz, CL16, 1.35V, Desktop Memory",
    image: "/assets/images/ram1.jpg",
    stock: 25
  },
  {
    id: 14,
    name: "Samsung 1TB 980 PRO SSD",
    category: "Hardware",
    price: 12999,
    description: "NVMe PCIe 4.0, M.2, Up to 7000 MB/s Read Speed",
    image: "/assets/images/ssd1.jpg",
    stock: 30
  },
  {
    id: 15,
    name: "WD Blue 2TB HDD",
    category: "Hardware",
    price: 4999,
    description: "3.5-inch, 7200 RPM, SATA 6 Gb/s, 256MB Cache",
    image: "/assets/images/hdd1.jpg",
    stock: 40
  },
  {
    id: 16,
    name: "ASUS ROG Strix B550-F Gaming",
    category: "Hardware",
    price: 15999,
    description: "ATX Motherboard, AMD AM4, PCIe 4.0, WiFi 6",
    image: "/assets/images/motherboard1.jpg",
    stock: 12
  },
  {
    id: 17,
    name: "MSI MPG A750G Power Supply",
    category: "Hardware",
    price: 8999,
    description: "750W, 80+ Gold Certified, Fully Modular",
    image: "/assets/images/psu1.jpg",
    stock: 18
  },
  {
    id: 18,
    name: "Corsair iCUE H100i RGB PRO XT",
    category: "Hardware",
    price: 11999,
    description: "240mm Liquid CPU Cooler, RGB Pump and Fans",
    image: "/assets/images/cooler1.jpg",
    stock: 10
  },
  {
    id: 19,
    name: "NZXT H510 Mid Tower",
    category: "Hardware",
    price: 7499,
    description: "Tempered Glass Side Panel, Cable Management System, Compact ATX",
    image: "/assets/images/case1.jpg",
    stock: 15
  },
  {
    id: 20,
    name: "Gaming Desktop Bundle",
    category: "Desktop",
    price: 149999,
    description: "Ryzen 9 5950X, RTX 3090, 64GB RAM, 2TB NVMe SSD, Windows 11 Pro",
    image: "/assets/images/bundle1.jpg",
    stock: 3
  }
];

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(mockProducts);
  const [filteredProducts, setFilteredProducts] = useState(mockProducts);
  
  const filterByCategory = (category) => {
    if (category === "All") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(product => product.category === category));
    }
  };
  
  const searchProducts = (query) => {
    const lowercasedQuery = query.toLowerCase();
    setFilteredProducts(
      products.filter(
        product => 
          product.name.toLowerCase().includes(lowercasedQuery) || 
          product.description.toLowerCase().includes(lowercasedQuery)
      )
    );
  };
  
  const updateProductStock = (productId, newStock) => {
    setProducts(
      products.map(product => 
        product.id === productId ? { ...product, stock: newStock } : product
      )
    );
    setFilteredProducts(
      filteredProducts.map(product => 
        product.id === productId ? { ...product, stock: newStock } : product
      )
    );
  };
  
  const value = {
    products,
    filteredProducts,
    filterByCategory,
    searchProducts,
    updateProductStock
  };
  
  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};