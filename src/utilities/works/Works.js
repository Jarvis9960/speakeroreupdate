import React, { useState } from "react";
import "./works.css";
import savetime from "../../images/savetime.png";
import goal1 from "../../images/goal.png";
import partnership from "../../images/partnership.png";
import vector from "../../images/Vector.png";

import debate from '../../images/debate-1.png'
import fan from '../../images/fan-club-1.png'
import list from '../../images/list-1.png'
import { Link } from "react-router-dom";


const Works = () => {
  const [left, setLeft] = useState(true);
  const [right, setRight] = useState(false);

  const handleLeft = () => {
    setLeft(true);
    setRight(false)
  }

  const handleRight = () => {
    setRight(true)
    setLeft(false);
  }

  return (
    <div className="workcontainer">
      <div className="works-heading">
        <h2> How SpeakerOre works</h2>
        <span>Your GoldMine start Mining</span>
      </div>
      <div className="in-swap">
        <div className="swapbutton">
          <button onClick={handleLeft} className={left === true ? "green" : "initial"}>I am a Speaker</button>
          <button onClick={handleRight} className={right === true ? "green" : "initial"}>I am an Event Manager</button>
        </div>
      </div>

      {left === true ?
        <div className="works-container " >
          <div className="works-box1">
            <img alt="img" src={savetime} style={{ backgroundImage: { vector } }} />
            <p> <b>Save time</b>, find Events <br />of your interest</p>
          </div>
          <div className="works-box1">
            <img alt="img" src={partnership} />
            <p>Directly finalise with <br /> <b>organisers.</b> Speak to get<br /> noticed.</p>
          </div>
          <div className="works-box1">
            <img alt="img" src={goal1} />
            <p>Achieve your Professional <br /> and personal. <b>Goals - Fame, </b><br /><b>Power, Money & Peace</b></p>
          </div>
        </div>
        :
        <div className="works-container">
          <div className="works-box1">
            <img alt="img" src={list} style={{ backgroundImage: { vector } }} />
            <p>
              Post your event’s Speaker <br /> requirement for free.
            </p>
          </div>

          <div className="works-box1">
            <img alt="img" src={debate} />
            <p>Receive profiles directly from <br /> <bold>best speakers / Experts.</bold></p>
          </div>

          <div className="works-box1">
            <img alt="img" src={fan} />
            <p>Happy Audience, Successful <br /> Event, <bold>Newer Opportunities.</bold></p>
          </div>
        </div>}

      <div className="joinowbtn">
        <Link to='/subscription'><button>Join now</button></Link>
      </div>
    </div>
  );
};

export default Works;
