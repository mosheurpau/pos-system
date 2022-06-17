import { faTrashCan, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const Cart = ({
  cart,
  handlePlusQuantity,
  handleMinusQuantity,
  handleDeleteItem,
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
      <table class="table table-compact w-full text-gray-600 font-bold">
        <thead>
          <tr>
            <th>Index</th>
            <th>Picture</th>
            <th>Name</th>
            <th></th>
            <th></th>
            <th></th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {cart?.map((carItem, index) => (
            <tr key={carItem.id} carPart={carItem} class="hover">
              <td>{index + 1}</td>
              <td>
                <div class="avatar">
                  <div class="w-12 rounded-xl">
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
                <button class="btn btn-outline border-0 btn-sm btn-neutral">
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
    </div>
  );
};

export default Cart;
