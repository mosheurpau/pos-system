import React, { useEffect, useState } from "react";
import Cart from "../Cart/Cart";
import Product from "../Product/Product";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch("products.json")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const handleAddToCart = (selectedProduct) => {
    // console.log(selectedProduct);
    let newCart = [];
    const exists = cart.find((product) => product.id === selectedProduct.id);
    if (!exists) {
      selectedProduct.quantity = 1;
      newCart = [...cart, selectedProduct];
    } else {
      const rest = cart.filter((product) => product.id !== selectedProduct.id);
      exists.quantity = exists.quantity + 1;
      newCart = [...rest, exists];
    }
    setCart(newCart);
  };

  const handlePlusQuantity = (selected) => {
    // console.log(selected);
    let plusCart = [];
    const exists = cart.find((product) => product.id === selected.id);
    if (!exists) {
      plusCart = [...cart, selected];
    } else {
      const rest = cart.filter((product) => product.id !== selected.id);
      exists.quantity = exists.quantity + 1;
      plusCart = [...rest, exists];
    }
    setCart(plusCart);
  };

  const handleMinusQuantity = (selected) => {
    // console.log(selected);
    let MinusCart = [];
    const exists = cart.find((product) => product.id === selected.id);
    if (!exists) {
      MinusCart = [...cart, selected];
    } else {
      const rest = cart.filter((product) => product.id !== selected.id);
      if (exists?.quantity > 0) {
        exists.quantity = exists.quantity - 1;
      }
      MinusCart = [...rest, exists];
    }
    setCart(MinusCart);
  };

  const handleDeleteItem = (product) => {
    const rest = cart.filter((item) => item.id !== product.id);
    setCart(rest);
  };

  return (
    <div className="mx-auto">
      <div className="mt-10">
        <div class="grid grid-cols-1 gap-5 md:grid-cols-2 px-10 mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mx-auto md:order-2 border-2 p-5">
            {products.map((product) => (
              <Product
                key={product.id}
                product={product}
                handleAddToCart={handleAddToCart}
              ></Product>
            ))}
          </div>
          <div className="md:order-1">
            {
              <Cart
                cart={cart}
                handlePlusQuantity={handlePlusQuantity}
                handleMinusQuantity={handleMinusQuantity}
                handleDeleteItem={handleDeleteItem}
              ></Cart>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
