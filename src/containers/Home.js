import React from "react";
import HomeSticker_V01 from "../HomeSticker_V01.png";
import HomeSticker_V02 from "../HomeSticker_V02.png";
import HomeSticker_V03 from "../HomeSticker_V03.png";
import HomeSticker_V04 from "../HomeSticker_V04.png";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <>
      <div className="main_container">
        <div className="characters_wrapper">
          <img src={HomeSticker_V01} alt="" />
          <img src={HomeSticker_V02} alt="" />
          <img src={HomeSticker_V03} alt="" />
          <img src={HomeSticker_V04} alt="" />
        </div>
        <div className="footer_container">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Home;
