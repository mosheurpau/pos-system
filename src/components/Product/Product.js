import React from "react";

const Product = ({ product, handleAddToCart }) => {
  const { name, price, img } = product;
  return (
    <div
      onClick={() => handleAddToCart(product)}
      class="card shadow-xl mx-auto"
    >
      <figure>
        <img
          height={400}
          width={400}
          src={img}
          alt="Shoes"
          class="rounded-xl"
        />
      </figure>
      <div class="card-body items-center text-center py-0 px-0">
        <p>${price}</p>
        <p className="px-2 mt-0">
          <small>{name}</small>
        </p>
      </div>
    </div>
  );
};

export default Product;
