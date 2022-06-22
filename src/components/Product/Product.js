import React from "react";

const Product = ({ product, handleAddToCart }) => {
  const { name, price, img } = product;
  return (
    // show all products
    <div
      onClick={() => handleAddToCart(product)}
      className="border-2 h-48 w-28 shadow-xl mx-auto"
    >
      <figure>
        <img height={400} width={400} src={img} alt="TShart" />
      </figure>
      <div className="items-center text-center py-0 px-0">
        <div className="border-b-2">
          <p>${price}</p>
        </div>
        <p className="px-2 py-2 m-0">
          <small>{name}</small>
        </p>
      </div>
    </div>
  );
};

export default Product;
