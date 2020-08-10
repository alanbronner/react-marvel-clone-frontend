import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";

import Axios from "axios";

import StopSticker from "../StopSticker.png";

function Login({ onLogIn, setIsActive }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordIsHidden, setPasswordIsHidden] = useState(false);
  const [error, setError] = useState(null);

  let history = useHistory();

  const submit = async () => {
    if (!email || !password) {
      return;
    } else {
      try {
        const responseLogin = await Axios.post(
          "https://gateway-express-marvel.herokuapp.com/user/log_in",
          {
            email: email,
            password: password,
          }
        );

        onLogIn(responseLogin.data.account.token, responseLogin.data._id);
        setIsActive("none");
        history.push("/characters");
        setError(null);
        setEmail("");
        setPassword("");
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
    <div className="form_login_container">
      <div className="form_login_wrapper">
        <div className="form_login_img">
          <span>
            <img src={StopSticker} height="200px" alt="" />
          </span>
          <h3>Two easy steps to login</h3>
        </div>
        <div className="form_login_body">
          <div className="form_login_content">
            <form onSubmit={onSubmit}>
              <section className="input_section">
                <div className="input_icon_wrap">
                  <span className="input_icon_email"></span>
                  <input
                    className="input_with_icon"
                    type="email"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    placeholder="email"
                    autoComplete="on"
                    value={email}
                  />
                </div>
                <br />
                <div className="input_icon_wrap">
                  <span
                    className={
                      passwordIsHidden ? "input_icon_eye" : "input_icon_unhide"
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
                    placeholder="password"
                    autoComplete="on"
                    value={password}
                  />
                </div>
              </section>
              <section className="submit_section">
                <p>Psssit you can reveal your password if necessary</p>
                <button className="btn" type="submit">
                  Login
                </button>
              </section>
              <section className="error_section">
                <div className="form_error_wrapper">
                  {error ? <p>{error}</p> : ""}
                </div>
              </section>
            </form>
          </div>
          <div className="form_login_redirect">
            <p>
              Don’t have an account yet?&nbsp;
              <Link to="/sign-up">
                <span
                  className="form_signup_link"
                  onClick={() => {
                    setIsActive("none");
                  }}
                >
                  Sign up
                </span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
