import React from "react";

const Product = ({ product, handleAddToCart }) => {
  const { name, price, img } = product;
  return (
    <div
      onClick={() => handleAddToCart(product)}
      class=" border-2 shadow-xl mx-auto"
    >
      <figure>
        <img height={400} width={400} src={img} alt="TShart" />
      </figure>
      <div class="items-center text-center py-0 px-0">
        <div className="border-b-2">
          <p>${price}</p>
        </div>
        <p className="px-2 py-0 m-0">
          <small>{name}</small>
        </p>
      </div>
    </div>
  );
};

export default Product;
