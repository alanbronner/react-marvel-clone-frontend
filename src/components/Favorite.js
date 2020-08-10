import React, { useState } from "react";
import { useLocation } from "react-router-dom";

import Axios from "axios";
import Cookies from "js-cookie";

import Modal from "../components/Modal";
import GoodSticker from "../GoodSticker.png";
import AlreadyInSticker from "../AlreadyInSticker.png";

const Favorite = ({ id, variant, name, photo, setData }) => {
  let location = useLocation();

  const newPhoto = encodeURIComponent(photo);
  const newName = encodeURIComponent(name);

  const [isActive, setIsActive] = useState("none");
  const [message, setMessage] = useState([
    <div className="modal_validated">
      <h3>Thanks</h3>
      <img src={GoodSticker} alt="" />
    </div>,
  ]);
  const userId = Cookies.get("userId");

  const add = async (
    userId,
    variantType,
    favoriteId,
    favoriteName,
    favoritePhoto
  ) => {
    try {
      const response = await Axios.put(
        `https://gateway-express-marvel.herokuapp.com/user/preferences/add_favoris/${userId}/${variantType}/${favoriteId}/${favoriteName}/${favoritePhoto}`
      );
      setIsActive("block");
    } catch (error) {
      console.log("error.message = ", error.message);
      if (
        error.response &&
        error.response.data.error === "Favorite already in favoris"
      ) {
        setIsActive("block");
        setMessage(
          <div className="modal_refused">
            <h3>Already in!</h3>
            <img src={AlreadyInSticker} alt="" />
          </div>
        );
      }
    }
  };

  const remove = async (userId, favoriteId) => {
    try {
      const response = await Axios.put(
        `https://gateway-express-marvel.herokuapp.com/user/preferences/remove_favoris/${userId}/${favoriteId}`
      );
      setData(response.data.preferences.favoris);
    } catch (error) {
      console.log("error.message = ", error.message);
      if (error.message) {
        console.log("error.response = ", error.response);
      }
    }
  };

  return (
    <>
      {location.pathname === "/favoris" ? (
        <div className="favorite_wrapper">
          <div className="favorite_remove_btn">
            <button className="btn" onClick={() => remove(userId, id)}>
              Remove
            </button>
          </div>
        </div>
      ) : (
        <div className="favorite_wrapper">
          <div className="favorite_add_btn">
            <button
              className="btn"
              onClick={() => add(userId, variant, id, newName, newPhoto)}
            >
              Add to Favorite
            </button>
          </div>
          <div className="favorite_add_modal">
            <Modal isActive={isActive} setIsActive={setIsActive}>
              {message}
            </Modal>
          </div>
        </div>
      )}
    </>
  );
};

export default Favorite;
