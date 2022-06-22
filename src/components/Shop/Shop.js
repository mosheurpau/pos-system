import React, { useEffect, useState } from "react";
import Cart from "../Cart/Cart";
import Product from "../Product/Product";
import { ChevronLeftIcon, PlusIcon } from "@heroicons/react/solid";
import {
  CashIcon,
  CreditCardIcon,
  UserIcon,
  XCircleIcon,
  SearchIcon,
} from "@heroicons/react/outline";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBagShopping, faBarcode } from "@fortawesome/free-solid-svg-icons";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [payCancel, setPayCancel] = useState(true);
  const [payNow, setPayNow] = useState(false);
  const [grandTotal, setGrandTotal] = useState(0);
  const [cash, setCash] = useState(true);
  const [card, setCard] = useState(false);
  const [account, setAccount] = useState(false);
  const [cheque, setCheque] = useState(false);

  // handle pay and cancel button
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

  // handle all payment system form
  const paymentSystemFormHandling = (data) => {
    // console.log(data);
    if (data === "cash") {
      setCash(true);
      setCard(false);
      setAccount(false);
      setCheque(false);
    } else if (data === "card") {
      setCash(false);
      setCard(true);
      setAccount(false);
      setCheque(false);
    } else if (data === "account") {
      setCash(false);
      setCard(false);
      setAccount(true);
      setCheque(false);
    } else if (data === "cheque") {
      setCash(false);
      setCard(false);
      setAccount(false);
      setCheque(true);
    }
  };

  // load data
  useEffect(() => {
    fetch("products.json")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  // cart handling
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

  // quantity handling for plus button
  const handlePlusQuantity = (selected) => {
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

  // quantity handling for minus button
  const handleMinusQuantity = (selected) => {
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

  // handle remove product from cart
  const handleDeleteItem = (product) => {
    const rest = cart.filter((item) => item.id !== product.id);
    setCart(rest);
    setPayCancel(true);
    setPayNow(false);
  };

  return (
    <div className="mx-auto">
      <div className="mt-10">
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 mx-5">
          {/* show all products shop  */}
          {payCancel && (
            <div className=" md:order-2 mx-auto border-2 p-5">
              {/* product search option and Barcode scanner */}
              <div className="mb-3 mt-0">
                <form>
                  <label
                    for="default-search"
                    className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300"
                  >
                    Search
                  </label>
                  <div class="relative">
                    <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                      <SearchIcon className="h-6 w-6 text-gray-500" />
                    </div>
                    <input
                      type="search"
                      id="default-search"
                      className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Search Products..."
                      required
                    />
                    <button
                      type="submit"
                      className="text-white absolute right-2.5 bottom-2.5 bg-gray-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      <FontAwesomeIcon icon={faBarcode} className="mx-2" />
                    </button>
                  </div>
                </form>
              </div>

              {/* All Categories filtering button  */}
              <div className="mb-3">
                <button className="btn btn-sm btn-outline mr-3 mb-3 text-black normal-case rounded-sm focus:text-blue-500 text-sm">
                  <label for="all-categories-modal">All Categories</label>
                </button>
                <button className="btn btn-sm btn-outline  mr-3 mb-3 text-black normal-case rounded-sm focus:text-blue-500 text-sm">
                  Electronic
                </button>
                <button className="btn btn-sm btn-outline  mr-3 mb-3 text-black normal-case rounded-sm focus:text-blue-500 text-sm">
                  Home & Lifestyle
                </button>
                <button className="btn btn-sm btn-outline  mr-3 mb-3 text-black normal-case rounded-sm focus:text-blue-500 text-sm">
                  Men Fashion
                </button>
                <button className="btn btn-sm btn-outline  mr-3 mb-3 text-black normal-case rounded-sm focus:text-blue-500 text-sm">
                  Women Fashion
                </button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 ">
                {products.map((product) => (
                  <Product
                    key={product.id}
                    product={product}
                    handleAddToCart={handleAddToCart}
                  ></Product>
                ))}

                {/* All categories products modal */}
                <input
                  type="checkbox"
                  id="all-categories-modal"
                  className="modal-toggle"
                />
                <div className="modal">
                  <div className="modal-box relative">
                    <label
                      for="all-categories-modal"
                      className="btn btn-sm btn-circle absolute right-2 top-2"
                    >
                      ✕
                    </label>
                    <div>
                      <h2 className="text-2xl text-center font-bold">
                        Categories
                      </h2>
                    </div>
                    <div className="my-3">
                      <button className="btn btn-sm btn-outline  mr-3 mb-3 text-black normal-case rounded-sm focus:text-blue-500 text-sm">
                        All Categories
                      </button>
                      <button className="btn btn-sm btn-outline  mr-3 mb-3 text-black normal-case rounded-sm focus:text-blue-500 text-sm">
                        Electronic
                      </button>
                      <button className="btn btn-sm btn-outline  mr-3 mb-3 text-black normal-case rounded-sm focus:text-blue-500 text-sm">
                        Home & Lifestyle
                      </button>
                      <button className="btn btn-sm btn-outline  mr-3 mb-3 text-black normal-case rounded-sm focus:text-blue-500 text-sm">
                        Men Fashion
                      </button>
                      <button className="btn btn-sm btn-outline  mr-3 mb-3 text-black normal-case rounded-sm focus:text-blue-500 text-sm">
                        Women Fashion
                      </button>
                      <button className="btn btn-sm btn-outline  mr-3 mb-3 text-black normal-case rounded-sm focus:text-blue-500 text-sm">
                        Electronics
                      </button>
                      <button className="btn btn-sm btn-outline  mr-3 mb-3 text-black normal-case rounded-sm focus:text-blue-500 text-sm">
                        Toys
                      </button>
                      <button className="btn btn-sm btn-outline  mr-3 mb-3 text-black normal-case rounded-sm focus:text-blue-500 text-sm">
                        Electronic
                      </button>
                      <button className="btn btn-sm btn-outline  mr-3 mb-3 text-black normal-case rounded-sm focus:text-blue-500 text-sm">
                        Home & Lifestyle
                      </button>
                      <button className="btn btn-sm btn-outline  mr-3 mb-3 text-black normal-case rounded-sm focus:text-blue-500 text-sm">
                        Men Fashion
                      </button>
                      <button className="btn btn-sm btn-outline  mr-3 mb-3 text-black normal-case rounded-sm focus:text-blue-500 text-sm">
                        Women Fashion
                      </button>
                      <button className="btn btn-sm btn-outline  mr-3 mb-3 text-black normal-case rounded-sm focus:text-blue-500 text-sm">
                        Electronics
                      </button>
                      <button className="btn btn-sm btn-outline  mr-3 mb-3 text-black normal-case rounded-sm focus:text-blue-500 text-sm">
                        Toys
                      </button>
                      <button className="btn btn-sm btn-outline  mr-3 mb-3 text-black normal-case rounded-sm focus:text-blue-500 text-sm">
                        Electronic
                      </button>
                      <button className="btn btn-sm btn-outline  mr-3 mb-3 text-black normal-case rounded-sm focus:text-blue-500 text-sm">
                        Home & Lifestyle
                      </button>
                      <button className="btn btn-sm btn-outline  mr-3 mb-3 text-black normal-case rounded-sm focus:text-blue-500 text-sm">
                        Men Fashion
                      </button>
                      <button className="btn btn-sm btn-outline  mr-3 mb-3 text-black normal-case rounded-sm focus:text-blue-500 text-sm">
                        Women Fashion
                      </button>
                      <button className="btn btn-sm btn-outline  mr-3 mb-3 text-black normal-case rounded-sm focus:text-blue-500 text-sm">
                        Electronics
                      </button>
                      <button className="btn btn-sm btn-outline  mr-3 mb-3 text-black normal-case rounded-sm focus:text-blue-500 text-sm">
                        Toys
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* when click pay now button then show all Payment system icon and button */}
          {payNow && (
            <div className="order-2">
              {/* Show total order Amount  */}
              <div className="flex justify-between items-center px-10 py-5 rounded-md text-black bg-gray-100 mb-3">
                <h5 className="text-lg">Order Amount</h5>
                <h5 className="text-3xl font-bold">
                  {" "}
                  ${grandTotal.toFixed(2)}
                </h5>
              </div>
              <div className="grid grid-cols-1 gap-2 md:grid-flow-row-dense md:grid-cols-3 bg-gray-100 pt-10 rounded-md">
                <div className="text-gray-500 ">
                  <div>
                    <button
                      onClick={() => paymentSystemFormHandling("cash")}
                      className=" border-0 normal-case bg-gray-100 text-gray-500 focus:text-blue-500 focus:bg-blue-100 w-full flex items-center text-2xl py-3 justify-start "
                    >
                      <CashIcon className="h-7 w-7 mx-5" />
                      Cash
                    </button>
                  </div>
                  <div>
                    <button
                      onClick={() => paymentSystemFormHandling("card")}
                      className=" border-0 normal-case bg-gray-100 text-gray-500 focus:text-blue-500 focus:bg-blue-100 w-full flex items-center text-2xl py-3 justify-start "
                    >
                      <CreditCardIcon className="h-7 w-7 mx-5" />
                      Card
                    </button>
                  </div>
                  <div>
                    <button
                      onClick={() => paymentSystemFormHandling("account")}
                      className=" border-0 normal-case bg-gray-100 text-gray-500 focus:text-blue-500 focus:bg-blue-100 w-full flex items-center text-2xl py-3 justify-start "
                    >
                      <UserIcon className="h-7 w-7 mx-5" />
                      On Account
                    </button>
                  </div>
                  <div>
                    <button
                      onClick={() => paymentSystemFormHandling("cheque")}
                      className=" border-0 normal-case bg-gray-100 text-gray-500 focus:text-blue-500 focus:bg-blue-100 w-full flex items-center text-2xl py-3 justify-start "
                    >
                      <CreditCardIcon className="h-7 w-7 mx-5" />
                      Cheque
                    </button>
                  </div>
                </div>

                {/* All Payment system from  */}
                <div className="col-span-2">
                  <div className="mb-10 mx-auto">
                    {/* show cash Payment system from */}
                    {cash && (
                      <div>
                        <form className="w-full max-w-sm">
                          <div className="flex items-center border-b border-gray-500 py-2">
                            <input
                              className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                              type="text"
                              placeholder="Your Name"
                              required
                            />
                          </div>
                          <div className="flex items-center border-b border-gray-500 py-2">
                            <input
                              className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                              type="text"
                              placeholder="Your Phone Number"
                              required
                            />
                          </div>
                          <div className="flex items-center border-b border-gray-500 py-2">
                            <input
                              className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                              type="text"
                              placeholder="Your Address"
                              required
                            />
                          </div>
                          <div className="flex flex-wrap items-center justify-evenly mt-64 mb-10">
                            <div className="mb-5">
                              <button
                                onClick={() => PayButtonHandling("payCancel")}
                                className="btn gap-2 bg-red-100 border-0 text-red-500 normal-case text-lg px-5"
                              >
                                <XCircleIcon className="h-6 w-6 text-red-500" />
                                Cancel
                              </button>
                            </div>
                            <div className="mb-5">
                              <button
                                type="submit"
                                className="btn gap-2 bg-blue-500 border-0 text-white normal-case text-md px-3 text-md md:text-lg"
                              >
                                <FontAwesomeIcon
                                  icon={faBagShopping}
                                  className="mx-2"
                                />
                                Complete Payment
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    )}

                    {/* Card Payment system from */}
                    {card && (
                      <div>
                        <form className="w-full max-w-sm">
                          <div className="flex items-center border-b border-gray-500 py-2">
                            <input
                              className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                              type="text"
                              placeholder="Card Name"
                              required
                            />
                          </div>
                          <div className="flex items-center border-b border-gray-500 py-2">
                            <input
                              className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                              type="text"
                              placeholder="Card Number"
                              required
                            />
                          </div>
                          <div className="flex items-center border-b border-gray-500 py-2">
                            <input
                              className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                              type="text"
                              placeholder="Card Expire Date"
                              required
                            />
                          </div>
                          <div className="flex items-center border-b border-gray-500 py-2">
                            <input
                              className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                              type="text"
                              placeholder="Card Screen"
                              required
                            />
                          </div>
                          <div className="flex flex-wrap items-center justify-evenly mt-64 mb-10">
                            <div className="mb-5">
                              <button
                                onClick={() => PayButtonHandling("payCancel")}
                                className="btn gap-2 bg-red-100 border-0 text-red-500 normal-case text-lg px-5"
                              >
                                <XCircleIcon className="h-6 w-6 text-red-500" />
                                Cancel
                              </button>
                            </div>
                            <div className="mb-5">
                              <button
                                type="submit"
                                className="btn gap-2 bg-blue-500 border-0 text-white normal-case text-md px-3 text-md md:text-lg"
                              >
                                <FontAwesomeIcon
                                  icon={faBagShopping}
                                  className="mx-2"
                                />
                                Complete Payment
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    )}

                    {/* Account Payment system from */}
                    {account && (
                      <div>
                        <form className="w-full max-w-sm">
                          <div className="flex items-center border-b border-gray-500 py-2">
                            <input
                              className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                              type="text"
                              placeholder="Bank Name"
                              required
                            />
                          </div>
                          <div className="flex items-center border-b border-gray-500 py-2">
                            <input
                              className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                              type="text"
                              placeholder="Account Number"
                              required
                            />
                          </div>
                          <div className="flex flex-wrap items-center justify-evenly mt-64 mb-10">
                            <div className="mb-5">
                              <button
                                onClick={() => PayButtonHandling("payCancel")}
                                className="btn gap-2 bg-red-100 border-0 text-red-500 normal-case text-lg px-5"
                              >
                                <XCircleIcon className="h-6 w-6 text-red-500" />
                                Cancel
                              </button>
                            </div>
                            <div className="mb-5">
                              <button
                                type="submit"
                                className="btn gap-2 bg-blue-500 border-0 text-white normal-case text-md px-3 text-md md:text-lg"
                              >
                                <FontAwesomeIcon
                                  icon={faBagShopping}
                                  className="mx-2"
                                />
                                Complete Payment
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    )}

                    {/* Cheque Payment system from */}
                    {cheque && (
                      <div>
                        <form className="w-full max-w-sm">
                          <div className="flex items-center border-b border-gray-500 py-2">
                            <input
                              className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                              type="text"
                              placeholder="Bank Name"
                              required
                            />
                          </div>
                          <div className="flex items-center border-b border-gray-500 py-2">
                            <input
                              className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                              type="text"
                              placeholder="Cheque Number"
                              required
                            />
                          </div>

                          <div className="flex flex-wrap items-center justify-evenly mt-64 mb-10">
                            <div className="mb-5">
                              <button
                                onClick={() => PayButtonHandling("payCancel")}
                                className="btn gap-2 bg-red-100 border-0 text-red-500 normal-case text-lg px-5"
                              >
                                <XCircleIcon className="h-6 w-6 text-red-500" />
                                Cancel
                              </button>
                            </div>
                            <div className="mb-5">
                              <button
                                type="submit"
                                className="btn gap-2 bg-blue-500 border-0 text-white normal-case text-md px-3 text-md md:text-lg"
                              >
                                <FontAwesomeIcon
                                  icon={faBagShopping}
                                  className="mx-2"
                                />
                                Complete Payment
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Card section  */}
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
              className="modal-toggle"
            />

            {/* Handle modal for added new customer information  */}
            <label for="add-customer-modal" className="modal cursor-pointer">
              <label className="modal-box relative" for="">
                <div>
                  <div className="flex">
                    <ChevronLeftIcon className="mx-5 h-8 w-8 text-blue-500" />
                    <h2 className="text-2xl">Add New Customer</h2>
                  </div>
                  <div className="card-body">
                    <div className="form-control">
                      <input
                        type="text"
                        placeholder="Name"
                        className="input input-bordered"
                        required
                      />
                    </div>
                    <div className="form-control">
                      <input
                        type="text"
                        placeholder="email"
                        className="input input-bordered"
                      />
                    </div>
                    <div className="form-control">
                      <input
                        type="number"
                        placeholder="Phone"
                        className="input input-bordered"
                      />
                    </div>
                    <div className="form-control">
                      <input
                        type="text"
                        placeholder="Currency"
                        className="input input-bordered"
                      />
                    </div>
                    <div className="form-control">
                      <input
                        type="text"
                        placeholder="TAX ID"
                        className="input input-bordered"
                      />
                    </div>
                    <label className="label">
                      <a
                        href="/"
                        className="label-text-alt link link-hover text-blue-500 font-bold flex"
                      >
                        <PlusIcon className="mr-2 h-4 w-4 text-blue-500 font-bold" />
                        Add More Details
                      </a>
                    </label>
                    <div className="form-control mt-6">
                      <button className="btn btn-primary">Update</button>
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
