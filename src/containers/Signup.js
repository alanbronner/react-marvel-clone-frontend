import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Axios from "axios";

import HelloSticker from "../HelloSticker.png";
import BecauseGif from "../Because.gif";

function Signup({ setIsActive }) {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [checkBoxCGU, setCheckBoxCGU] = useState(false);
  const [error, setError] = useState(null);
  const [passwordIsHidden, setPasswordIsHidden] = useState(false);
  const [pwdConfirmationIsHidden, setPwdConfirmationIsHidden] = useState(false);
  const [promptIsHidden, setPromptIsHidden] = useState(true);
  setIsActive("none");

  const errors = {
    userName: "Username needs to be at least 5 characters long",
    // email: "Email requires a valid email",
    password: "Password must be the same",
    passwordConfirmation: "Password must be the same",
    checkBoxCGU: "CGU must be accept",
    inputs: "Please fill all the * input",
  };

  const submit = async () => {
    if (
      userName === "" ||
      password === "" ||
      email === "" ||
      passwordConfirmation === ""
    ) {
      setError(errors.inputs);
    } else if (userName.length < 5) {
      setError(errors.userName);
    } else if (email.indexOf("@") === -1) {
      setError(errors.email);
    } else if (password !== passwordConfirmation) {
      setError(errors.passwordConfirmation);
    } else if (!checkBoxCGU) {
      setError(errors.checkBoxCGU);
    } else {
      try {
        const responseSignup = await Axios.post(
          "https://gateway-express-marvel.herokuapp.com/user/sign_up",
          {
            email: email,
            username: userName,
            password: password,
          }
        );
        setError(null);
        setPromptIsHidden(false);
      } catch (error) {
        setEmail("");
        setPassword("");
        console.log("error.message = ", error.message);
        if (error.response) {
          setError(error.response.data.message);
        }
      }
    }
  };
  const onSubmit = (event) => {
    event.preventDefault();
    submit();
  };

  return (
    <>
      {!promptIsHidden ? (
        <div className="signup_emailer_wrapper">
          <div className="signup_emailer_title">
            <h1>Hey👋</h1>
          </div>
          <img className="signup_emailer_img" src={HelloSticker} alt="" />
          <p className="signup_emailer_content">
            We've just send you an email 💌 <br />
            to confirm your <span style={{ color: "#ed171e" }}>SIGNUP</span>
            <br />
          </p>
        </div>
      ) : (
        <div className="form_signup_container">
          <div className="form_signup_wrapper">
            <div className="form_signup_img">
              <img src={BecauseGif} alt="" />
            </div>
            <div className="form_signup_body">
              <div className="form_login_content">
                <h2>
                  From <span className="special">zero </span>to
                  <span className="special"> Hero</span>
                </h2>
                <form onSubmit={onSubmit}>
                  <section className="input_section">
                    <div className="input_icon_wrap_signup">
                      <span className="input_icon_user"></span>

                      <input
                        type="text"
                        className="input_with_icon"
                        onChange={(e) => {
                          setUserName(e.target.value);
                        }}
                        placeholder=" username*"
                        autoComplete="on"
                        value={userName}
                      />
                    </div>
                    <div className="input_icon_wrap_signup">
                      <span className="input_icon_email"></span>
                      <input
                        type="email"
                        className="input_with_icon"
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                        placeholder=" email*"
                        autoComplete="on"
                        value={email}
                      />
                    </div>
                    <div className="input_icon_wrap_signup">
                      <span
                        className={
                          passwordIsHidden
                            ? "input_icon_eye"
                            : "input_icon_unhide"
                        }
                        onClick={() => {
                          setPasswordIsHidden(!passwordIsHidden);
                        }}
                      ></span>
                      <input
                        className="input_with_icon"
                        type={passwordIsHidden ? "text" : "password"}
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                        autoComplete="on"
                        value={password}
                        placeholder=" password*"
                      />
                    </div>
                    <div className="input_icon_wrap_signup">
                      <span
                        className={
                          pwdConfirmationIsHidden
                            ? "input_icon_eye"
                            : "input_icon_unhide"
                        }
                        onClick={() => {
                          setPwdConfirmationIsHidden(!pwdConfirmationIsHidden);
                        }}
                      ></span>
                      <input
                        className="input_with_icon"
                        type={pwdConfirmationIsHidden ? "text" : "password"}
                        onChange={(e) => {
                          setPasswordConfirmation(e.target.value);
                        }}
                        autoComplete="on"
                        placeholder=" confirmation*"
                        value={passwordConfirmation}
                      />
                    </div>
                    <div className="input_checkbox">
                      <input
                        type="checkbox"
                        onChange={(e) => {
                          setCheckBoxCGU(e.target.checked);
                        }}
                        value={checkBoxCGU}
                      />
                      <div>« You have read and accepted CGU »</div>
                    </div>
                  </section>
                  <section className="submit_section">
                    <button className="btn" type="submit">
                      Signup
                    </button>
                  </section>
                  <section className="error_section">
                    <div className="form_error_wrapper">
                      {error ? <p>{error}</p> : ""}
                    </div>
                  </section>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default Signup;

// {error ? (
//   <div className="error_wrapper">
//     <div className="error_title">
//       <h1>Loggin Error</h1>
//     </div>
//     <div className="error_img">
//       <img src={SadSticker} alt="" />
//     </div>

//     <div className="error_content">
//       <p>
//         Something went wrong when you tried to verify.
//         <br /> Please try to{" "}
//         <span
//           onClick={() => {
//             history.push("/sign-up");
//           }}
//         >
//           Signin
//         </span>
//         again. <br /> If you're experiencing a critical issue,
//         <a
//           href="mailto:hellofrommarvel@gmail.com
// "
//         >
//           email support
//         </a>
//         .
//       </p>
//     </div>
//   </div>
