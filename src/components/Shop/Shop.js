import React, { useEffect, useState } from "react";
import Product from "../Product/Product";

const Shop = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("products.json")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <div className="mx-auto">
      <div className="hero min-h-screen">
        <div class="hero-content flex-col lg:flex-row-reverse">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 mx-auto">
            {products.map((product) => (
              <Product key={product.id} product={product}></Product>
            ))}
          </div>
          <div>
            <h1 class="text-5xl font-bold">Box Office News!</h1>
            <p class="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
            <button class="btn btn-primary">Get Started</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
