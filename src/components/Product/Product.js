import React from "react";

const Product = ({ product }) => {
  const { name, price, img } = product;
  return (
    <div class="card shadow-xl mx-auto">
      <figure>
        <img
          height={400}
          width={400}
          src={img}
          alt="Shoes"
          class="rounded-xl"
        />
      </figure>
      <div class="card-body items-center text-center">
        <p>${price}</p>
        <p>{name}</p>
      </div>
    </div>
  );
};

export default Product;
