import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import md5 from "crypto-js/md5";
import Cookies from "js-cookie";

import "./App.css";

import Home from "./containers/Home";
import Comics from "./containers/Comics";
import Comic from "./containers/Comic";
import Characters from "./containers/Characters";
import Character from "./containers/Character";
import Confirmation from "./containers/Confirmation";
import Signup from "./containers/Signup";
import Login from "./containers/Login";

import Header from "./components/Header";
import Modal from "./components/Modal";
import Favoris from "./containers/Favoris";

import ErrorSticker from "./ErrorSticker.png";

function App() {
  const API_CONFIG = {
    ts: Number(new Date()),
    MARVEL_API_PUBLIC_KEY: process.env.REACT_APP_MARVEL_API_PUBLIC_KEY,
    hash: md5(
      Number(new Date()) +
        process.env.REACT_APP_MARVEL_API_PRIVATE_KEY +
        process.env.REACT_APP_MARVEL_API_PUBLIC_KEY
    ),
  };

  const [userToken, setUserToken] = useState(Cookies.get("userToken") || null);
  const [userId, setUserId] = useState(Cookies.get("userId") || null);

  const onLogIn = (userToken, userId) => {
    setUserToken(userToken);
    setUserId(userId);
    Cookies.set("userToken", userToken);
    Cookies.set("userId", userId);
  };
  const onLogOff = () => {
    setUserToken(null);
    Cookies.remove("userToken");
    setUserId(null);
    Cookies.remove("userId");
  };
  const [isActive, setIsActive] = useState("none");
  const [data, setData] = useState([]);

  const checkIfUserIsLogged = () => {
    if (!userId) {
      return setIsActive("block");
    } else return setIsActive("none");
  };

  return (
    <div onMouseMove={() => checkIfUserIsLogged()}>
      <Router>
        <Header
          onLogOff={onLogOff}
          userToken={userToken}
          API_CONFIG={API_CONFIG}
          setData={setData}
        />
        <Switch>
          <Route path="/comics">
            <Comics API_CONFIG={API_CONFIG} data={data} setData={setData} />
          </Route>
          <Route path="/comic/:id">
            <Comic API_CONFIG={API_CONFIG} />
          </Route>
          <Route path="/characters">
            <Characters API_CONFIG={API_CONFIG} data={data} setData={setData} />
          </Route>
          <Route path="/character/:id">
            <Character API_CONFIG={API_CONFIG} />
          </Route>
          <Route path="/confirmation/:token">
            <Confirmation onLogIn={onLogIn} setIsActive={setIsActive} />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/favoris">
            <Favoris userId={userId} />
          </Route>
          <Route path="/sign-up">
            <Signup setIsActive={setIsActive} />
          </Route>
          <Route
            path="*"
            component={() => {
              return (
                <div className="error_wrapper">
                  <div className="error_title">
                    <h1>404</h1>
                  </div>
                  <div>
                    <div className="error_img">
                      <img src={ErrorSticker} alt="" />
                    </div>
                  </div>
                </div>
              );
            }}
          />
        </Switch>
        <Modal isActive={isActive} setIsActive={setIsActive}>
          <Login setIsActive={setIsActive} onLogIn={onLogIn}></Login>
        </Modal>
      </Router>
    </div>
  );
}

export default App;
