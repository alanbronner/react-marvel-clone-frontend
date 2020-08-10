import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

import Axios from "axios";

import ConfirmationSticker from "../ConfirmationSticker.png";
import SadSticker from "../SadSticker.png";

function Welcome({ onLogIn, setIsActive }) {
  let { token } = useParams();

  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [promptIsHidden, setPromptIsHidden] = useState(true);
  const [loading, setLoading] = useState("loading");
  setIsActive("none");
  let history = useHistory();
  const changeRoute = () => {
    history.push("/characters");
  };
  const changeRouteAfter = () => {
    const afterFiveSec = setTimeout(changeRoute, 5000);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await Axios.get(
          "https://gateway-express-marvel.herokuapp.com/user/confirmation/" +
            token
        );
        setData(response.data);
        setLoading("loaded");
        onLogIn(response.data.account.token, response.data._id);
        console.log(response.data.account.token, response.data._id);
        setPromptIsHidden(false);
      } catch (error) {
        if (error.response) {
          console.log("error.message = ", error.message);
          setError(error.response.data.message);
        }
      }
    };
    getData();
  }, []);

  console.log(data);
  return (
    <>
      {error ? (
        <div className="error_wrapper">
          <div className="error_title">
            <h1>Loggin Error</h1>
          </div>
          <div className="error_img">
            <img src={SadSticker} alt="" />
          </div>

          <div className="error_content">
            <p>
              Something went wrong when you tried to verify.
              <br /> Please try to&nbsp;
              <span
                style={{ color: "#ed171e" }}
                onClick={() => {
                  history.push("/sign-up");
                }}
              >
                SIGNUP&nbsp;
              </span>
              again. <br /> or&nbsp;
              <a
                style={{
                  textDecoration: "underline",
                }}
                href="mailto:hellofrommarvel@gmail.com
"
              >
                email support
              </a>
              .
            </p>
          </div>
        </div>
      ) : (
        <>
          {loading !== "loading" ? (
            <div className="welcome_wrapper" onMouseMove={changeRouteAfter()}>
              <div className="welcome_title">
                <h1>Youhou, welcome 🎉</h1>
              </div>
              <img className="welcome_img" src={ConfirmationSticker} alt="" />
              <div className="welcome_content"> {promptIsHidden}</div>
            </div>
          ) : null}
        </>
      )}
    </>
  );
}
export default Welcome;
