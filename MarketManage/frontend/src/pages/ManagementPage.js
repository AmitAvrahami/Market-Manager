import React, { useEffect, useState } from "react";
import ProductGrid from "../components/ProductGrid";
import { fetchProducts } from "../services/productService/ProductSevice";

const ManagementPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    getProducts();
  }, []);

  console.log(products);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-offWhite p-6">
      <ProductGrid rowsData={products} />
    </div>
  );
};

export default ManagementPage;
