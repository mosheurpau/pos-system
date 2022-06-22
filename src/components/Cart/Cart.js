import {
  faTrashCan,
  faPlusCircle,
  faMinusCircle,
} from "@fortawesome/free-solid-svg-icons";
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
  // all calculation handling
  let total = 0;
  let shipping = 0;
  let quantity = 0;
  for (const product of cart) {
    quantity = quantity + product.quantity;
    total = total + product.price * product.quantity;
    shipping = shipping + product.shipping;
  }
  // 10% tax calculation
  const tax = parseFloat((total * 0.1).toFixed(2));
  // 5% discount calculation
  const discount = parseFloat((total * 0.05).toFixed(2));
  const grandTotal = total + shipping + tax;

  return (
    <div>
      {/* customer details header  */}
      <div className="flex justify-between p-4 rounded bg-blue-100 ">
        <div>
          <label for="add-customer-modal" className="flex modal-button">
            <UserCircleIcon className="h-6 w-6 text-blue-500" />
            <span className="text-blue-500 font-bold ml-2">Steve Jobs</span>
          </label>
        </div>
        <div>
          <label for="add-customer-modal" className="m-0 modal-button">
            <PlusCircleIcon className="h-6 w-6 text-blue-500" />
          </label>
        </div>
      </div>
      {/* show cart item table  */}
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
                        className="mr-3 text-2xl"
                        icon={faPlusCircle}
                      />
                    </div>
                    <div> {carItem?.quantity}</div>
                    <div>
                      <FontAwesomeIcon
                        onClick={() => handleMinusQuantity(carItem)}
                        className="ml-3 text-2xl"
                        icon={faMinusCircle}
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

      {/* show all calculation  */}
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

      {/* show cart all bottom button */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 my-3">
        <button className="btn gap-2 bg-red-100 border-0 text-red-500 font-bold normal-case text-md px-0">
          <XCircleIcon className="h-6 w-6 text-red-500" />
          Cancel
        </button>
        <button className="btn gap-2 bg-blue-100 border-0 text-blue-500 font-bold normal-case text-md px-0">
          <HandIcon className="h-6 w-6 text-blue-500" />
          Hold
        </button>
        <button className="btn gap-2 bg-blue-100 border-0 text-blue-500 font-bold normal-case text-md px-0">
          <CurrencyDollarIcon className="h-6 w-6 text-blue-500" />
          Discount
        </button>
        <button
          onClick={() => PayButtonHandling("payNow", grandTotal)}
          className="btn gap-2 bg-blue-100 border-0 text-blue-500 font-bold normal-case text-md px-0"
        >
          <CashIcon className="h-6 w-6 text-blue-500" />
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default Cart;
