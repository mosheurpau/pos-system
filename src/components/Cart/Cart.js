import { faTrashCan, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

const Cart = ({ cart, handlePlusQuantity, handleMinusQuantity }) => {
  console.log("hh", cart);

  return (
    <div>
      <table class="table table-zebra w-full text-gray-600 font-bold">
        <thead>
          <tr>
            <th>Index</th>
            <th>Picture</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total Price</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {cart?.map((carItem, index) => (
            <tr key={carItem.id} carPart={carItem}>
              <td>{index + 1}</td>
              <td>
                <div class="avatar">
                  <div class="w-16 rounded-xl">
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
  );
};

export default Cart;
