import React, { useEffect, useState } from "react";
import Cart from "../Cart/Cart";
import Product from "../Product/Product";
import { ChevronLeftIcon, PlusIcon } from "@heroicons/react/solid";
import {
  CashIcon,
  CreditCardIcon,
  UserIcon,
  XCircleIcon,
} from "@heroicons/react/outline";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [payCancel, setPayCancel] = useState(true);
  const [payNow, setPayNow] = useState(false);
  const [grandTotal, setGrandTotal] = useState(0);

  const PayButtonHandling = (data, total) => {
    setGrandTotal(total);
    // console.log(data, total);
    if (data === "payCancel") {
      setPayCancel(true);
      setPayNow(false);
    } else if (data === "payNow") {
      setPayCancel(false);
      setPayNow(true);
    }
  };

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
    setPayCancel(true);
    setPayNow(false);
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
    setPayCancel(true);
    setPayNow(false);
  };

  const handleDeleteItem = (product) => {
    const rest = cart.filter((item) => item.id !== product.id);
    setCart(rest);
    setPayCancel(true);
    setPayNow(false);
  };

  return (
    <div className="mx-auto">
      <div className="mt-10">
        <div class="grid grid-cols-1 gap-2 md:grid-cols-2 mx-5">
          {payCancel && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mx-auto md:order-2 border-2 p-5">
              {products.map((product) => (
                <Product
                  key={product.id}
                  product={product}
                  handleAddToCart={handleAddToCart}
                ></Product>
              ))}
            </div>
          )}

          {payNow && (
            <div className="order-2">
              <div className="flex justify-between items-center px-10 py-5 rounded-md text-black bg-gray-100 mb-3">
                <h5 className="text-lg ">Order Amount</h5>

                <h5 className="text-3xl font-bold">
                  {" "}
                  ${grandTotal.toFixed(2)}
                </h5>
              </div>
              <div className="grid grid-cols-1 gap-2 md:grid-flow-row-dense md:grid-cols-3 bg-blue-200">
                <div className="text-gray-500 ">
                  <div>
                    <button className=" border-0 normal-case bg-gray-100 text-gray-500 focus:text-blue-500 focus:bg-blue-100 w-full flex items-center text-2xl py-3 justify-start ">
                      <CashIcon className="h-7 w-7 mx-5" />
                      Cash
                    </button>
                  </div>
                  <div>
                    <button className=" border-0 normal-case bg-gray-100 text-gray-500 focus:text-blue-500 focus:bg-blue-100 w-full flex items-center text-2xl py-3 justify-start ">
                      <CreditCardIcon className="h-7 w-7 mx-5" />
                      Card
                    </button>
                  </div>
                  <div>
                    <button className=" border-0 normal-case bg-gray-100 text-gray-500 focus:text-blue-500 focus:bg-blue-100 w-full flex items-center text-2xl py-3 justify-start ">
                      <UserIcon className="h-7 w-7 mx-5" />
                      On Account
                    </button>
                  </div>
                  <div className="mb-96">
                    <button className=" border-0 normal-case bg-gray-100 text-gray-500 focus:text-blue-500 focus:bg-blue-100 w-full flex items-center text-2xl py-3 justify-start ">
                      <CreditCardIcon className="h-7 w-7 mx-5" />
                      Cheque
                    </button>
                  </div>
                </div>
                <div className="bg-green-200 col-span-2">
                  <div className="mb-96">
                    <h2>bhbjnb </h2>
                  </div>
                  <div className="flex flex-wrap items-center justify-evenly">
                    <div className="mb-5">
                      <button
                        onClick={() => PayButtonHandling("payCancel")}
                        class="btn gap-2 bg-red-100 border-0 text-red-500 normal-case text-2xl px-5"
                      >
                        <XCircleIcon className="h-6 w-6 text-red-500" />
                        Cancel
                      </button>
                    </div>
                    <div className="mb-5">
                      <button
                        onClick={() => PayButtonHandling("payCancel")}
                        class="btn gap-2 bg-blue-500 border-0 text-white normal-case text-md px-5 text-md md:text-2xl"
                      >
                        <CashIcon className="h-6 w-6 text-white-500" />
                        Complete Payment
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <h2>{grandTotal.toFixed(2)}</h2>
              <button
                className="btn"
                onClick={() => PayButtonHandling("payCancel")}
              >
                Cancel
              </button>
            </div>
          )}

          <div className="md:order-1">
            {
              <Cart
                cart={cart}
                handlePlusQuantity={handlePlusQuantity}
                handleMinusQuantity={handleMinusQuantity}
                handleDeleteItem={handleDeleteItem}
                PayButtonHandling={PayButtonHandling}
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
