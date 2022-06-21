import { faTrashCan, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  XCircleIcon,
  HandIcon,
  CurrencyDollarIcon,
  CashIcon,
  PlusCircleIcon,
  PencilAltIcon,
} from "@heroicons/react/outline";
import { UserCircleIcon } from "@heroicons/react/solid";
import React from "react";

const Cart = ({
  cart,
  handlePlusQuantity,
  handleMinusQuantity,
  handleDeleteItem,
  PayButtonHandling,
}) => {
  // console.log("hh", cart);
  let total = 0;
  let shipping = 0;
  let quantity = 0;
  for (const product of cart) {
    quantity = quantity + product.quantity;
    total = total + product.price * product.quantity;
    shipping = shipping + product.shipping;
  }
  const tax = parseFloat((total * 0.1).toFixed(2));
  const discount = parseFloat((total * 0.05).toFixed(2));
  const grandTotal = total + shipping + tax;

  return (
    <div>
      <div className="flex justify-between p-4 rounded bg-blue-100 ">
        <div className="">
          <label for="add-customer-modal" class="flex modal-button">
            <UserCircleIcon className="h-6 w-6 text-blue-500" />
            <span className="text-blue-500 font-bold ml-2">Steve Jobs</span>
          </label>
        </div>
        <div>
          <label for="add-customer-modal" class="m-0 modal-button">
            <PlusCircleIcon className="h-6 w-6 text-blue-500" />
          </label>
        </div>
      </div>
      <div className="overflow-x-auto overflow-y-auto h-96">
        <table className="table table-compact w-full text-gray-600 font-bold ">
          <thead>
            <tr></tr>
          </thead>
          <tbody>
            {cart?.map((carItem, index) => (
              <tr key={carItem.id} carPart={carItem} className="hover">
                <td>
                  <PencilAltIcon className="h-6 w-6 text-gray-500" />
                </td>
                <td>
                  <div className="avatar">
                    <div className="w-12 rounded-xl">
                      <img src={carItem?.img} alt="pic" />
                    </div>
                  </div>
                </td>
                <td>{carItem?.name}</td>
                <td>${carItem?.price}</td>
                <td>
                  <div className="flex">
                    <div>
                      <FontAwesomeIcon
                        onClick={() => handlePlusQuantity(carItem)}
                        className="text-white rounded-full bg-slate-500 p-1 border-5  mr-3"
                        icon={faPlus}
                      />
                    </div>
                    <div> {carItem?.quantity}</div>
                    <div>
                      <FontAwesomeIcon
                        onClick={() => handleMinusQuantity(carItem)}
                        className="text-white rounded-full bg-slate-500 p-1 ml-3"
                        icon={faMinus}
                      />
                    </div>
                  </div>
                </td>
                <td>${carItem?.quantity * carItem?.price}</td>
                <td>
                  <button className="btn btn-outline border-0 btn-sm btn-neutral">
                    <FontAwesomeIcon
                      onClick={() => handleDeleteItem(carItem)}
                      className="text-red-500 text-2xl"
                      icon={faTrashCan}
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="grid grid-cols-2 mt-2">
        <div></div>
        <div className="pr-5">
          <div className="flex justify-between py-2 border-t-2">
            <p>Sub Total:</p>
            <h2 className="font-bold"> ${total}</h2>
          </div>
          <div className="flex justify-between py-2 border-t-2">
            <p>Tax:</p>
            <h2 className="font-bold">${tax}</h2>
          </div>
          <div className="flex justify-between py-2 border-t-2">
            <p>Shipping:</p>
            <h2 className="font-bold">${shipping}</h2>
          </div>
          <div className="flex justify-between py-2 border-t-2">
            <p className="text-blue-500 font-bold">Discount on Cart:</p>
            <h2 className="font-bold">${discount}</h2>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 text-left rounded-md p-3 text-blue-500 bg-blue-100 ">
        <p>Selected Items ({quantity})</p>
        <div className="flex justify-between font-bold">
          <h2 className="">Grand Total:</h2>
          <h5> ${grandTotal.toFixed(2)}</h5>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-3 my-3">
        <button class="btn gap-2 bg-red-100 border-0 text-red-500 font-bold normal-case text-md px-0">
          <XCircleIcon className="h-6 w-6 text-red-500" />
          Cancel
        </button>
        <button class="btn gap-2 bg-blue-100 border-0 text-blue-500 font-bold normal-case text-md px-0">
          <HandIcon className="h-6 w-6 text-blue-500" />
          Hold
        </button>
        <button class="btn gap-2 bg-blue-100 border-0 text-blue-500 font-bold normal-case text-md px-0">
          <CurrencyDollarIcon className="h-6 w-6 text-blue-500" />
          Discount
        </button>
        <button
          onClick={() => PayButtonHandling("payNow", grandTotal)}
          class="btn gap-2 bg-blue-100 border-0 text-blue-500 font-bold normal-case text-md px-0"
        >
          <CashIcon className="h-6 w-6 text-blue-500" />
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default Cart;
