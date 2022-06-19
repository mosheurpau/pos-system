import React, { useEffect, useState } from "react";
import Cart from "../Cart/Cart";
import Product from "../Product/Product";
import { ChevronLeftIcon, PlusIcon } from "@heroicons/react/solid";

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
            <input
              type="checkbox"
              id="add-customer-modal"
              class="modal-toggle"
            />
            <label for="add-customer-modal" class="modal cursor-pointer">
              <label class="modal-box relative" for="">
                <div>
                  <div className="flex">
                    <ChevronLeftIcon className="mx-5 h-8 w-8 text-blue-500" />
                    <h2 className="text-2xl">Add New Customer</h2>
                  </div>
                  <div class="card-body">
                    <div class="form-control">
                      <input
                        type="text"
                        placeholder="Name"
                        class="input input-bordered"
                        required
                      />
                    </div>
                    <div class="form-control">
                      <input
                        type="text"
                        placeholder="email"
                        class="input input-bordered"
                      />
                    </div>
                    <div class="form-control">
                      <input
                        type="number"
                        placeholder="Phone"
                        class="input input-bordered"
                      />
                    </div>
                    <div class="form-control">
                      <input
                        type="text"
                        placeholder="Currency"
                        class="input input-bordered"
                      />
                    </div>
                    <div class="form-control">
                      <input
                        type="text"
                        placeholder="TAX ID"
                        class="input input-bordered"
                      />
                    </div>
                    <label class="label">
                      <a
                        to="#"
                        class="label-text-alt link link-hover text-blue-500 font-bold flex"
                      >
                        <PlusIcon className="mr-2 h-4 w-4 text-blue-500 font-bold" />
                        Add More Details
                      </a>
                    </label>
                    <div class="form-control mt-6">
                      <button class="btn btn-primary">Update</button>
                    </div>
                  </div>
                </div>
              </label>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
