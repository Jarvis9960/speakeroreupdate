import React, { useState } from "react";
import "./viewdetails.css";
import man from "../../images/Group 11450.png";
import web from "../../images/mdi_web.png";
import { MdDateRange } from "react-icons/md";
import { MdOutlineLocationOn } from "react-icons/md";
import { BsFillPersonFill } from "react-icons/bs";
import { IoSchoolSharp } from "react-icons/io5";
import { MdLocationOn } from "react-icons/md";
import { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { AiOutlineMail } from 'react-icons/ai';

const Viewdetails = () => {
  const [data, setData] = useState();
  const { eventId } = useParams();

  function convertDate(e) {
    const dateObject = new Date(e);
    const year = dateObject.getUTCFullYear();
    const month = new Intl.DateTimeFormat("en-US", { month: "short" }).format(
      dateObject
    );
    const day = dateObject.getUTCDate();
    const hours = dateObject.getUTCHours();
    const minutes = dateObject.getUTCMinutes();
    const seconds = dateObject.getUTCSeconds();
    const period = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;

    const dateTimeString = `${day} ${month} ${year} ${formattedHours}:${minutes}:${seconds} ${period}`;
    return dateTimeString;
  }

  useEffect(() => {
    axios({
      method: "get",
      url: `https://api.speakerore.com/api/getsingleevent/${eventId}`,
      withCredentials: true,
    })
      .then((res) => {
        console.log(res);
        setData(res.data.savedEvent);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
 
// cosnole.log(data.isSpeakerOreExclusive)
  return data ? (
    <div>
      <div id="HEad-banner" className="head-banner">
        <div id="BAnner-container" className="banner-container">
          <div id="BAnner-text" className="banner-text">
            <span>{data.TitleOfTheEvent}</span>
          </div>
          <div id="BAnner-img" className="banner-img">
            <img src={man} />
          </div>
        </div>
      </div>

      <div style={{ margin: "2rem 0 0 0" }}>
        <div id="MAil" className="mail">
          <span>
            Find your Life Changing Event. Speaking is a serious Business .Every
            Expert must get noticed to build their empire of followers.
            Knowledge within you wont help the world at.
          </span>

          {data.isSpeakerOreExclusive ? (
            <div id="WEb" className="web">
              <AiOutlineMail />
              
              <a href={`mailto:${data.OrganizerEmail}`} id="website">
                {" "}
                {data.OrganizerEmail}
              </a>
            </div>
          ) : (
            <div id="WEb" className="web">
            <img src={web} style={{ textAlign: "center" }} />
            <a href={data.EventWebsiteUrl} style={{ marginLeft: "10px" }}>
              {" "}
              {data.EventWebsiteUrl}
            </a>
          </div>
          )}

        </div>
      </div>

      <div id="VEnue-details" className="venue-details">
        <div>
          <h2
            style={{
              fontWeight: "600",
              fontSize: "medium",
              padding: "1rem 0rem 1rem 0rem",
            }}
          >
            When and where and who
          </h2>
        </div>
        <div id="VEnue-details-container" className="venue-details-container">
          <div id="DAteandtime box" className="dateandtime box">
            <div id="ICon-view" className="icon-view">
              <MdDateRange />
            </div>
            <div id="VIew-description" className="view-description">
              <bold>Date and time</bold>
              <div id="IN-des" className="in-des">
                {convertDate(data.EventStartDateAndTime)}
              </div>
            </div>
          </div>

          <div id="LOcation box" className="location box">
            <div id="ICon-view" className="icon-view">
              <MdOutlineLocationOn />
            </div>
            <div id="VIew-description" className="view-description">
              <bold>Location</bold>
              <div id="IN-des" className="in-des">
                {" "}
                <span>
                  {data.Location}
                  <br /> {data.Pincode}
                </span>
                {data.City},<br /> {data.Country}{" "}
              </div>
            </div>
          </div>

          <div id="AUdience box" className="audience box">
            <div id="ICon-view" className="icon-view">
              <BsFillPersonFill />
            </div>
            <div id="VIew-description" className="view-description">
              <bold>Audience</bold>
              <div id="IN-des" className="in-des">
                <li>{data.AudienceSize}</li>
                <li>{data.AudienceType}</li>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="ABoutevent" className="aboutevent">
        <div>
          <h2 style={{ fontWeight: "700", fontSize: "medium" }}>
            About this event
          </h2>
        </div>
        <div id="EVenttype" className="eventtype">
          <small>
            <IoSchoolSharp
              size={16}
              color="green"
              style={{ marginRight: "7px" }}
            />{" "}
            {data.Category}
          </small>
          <span>
            <MdLocationOn
              id="Location"
              color="green"
              size={20}
              style={{ marginRight: "7px" }}
            />
            {data.EngagementTerm}
          </span>
        </div>
        <div id="ABoutevent-para" className="aboutevent-para">
          <span>{data.DetailedDescriptionOfTheEvent}</span>
        </div>
      </div>

      <div id="TAgs" className="tags">
        <h3 style={{ fontWeight: "800" }}>Tags</h3>
        <div id="TAg" className="tag">
          {data.Tags.map((e) => {
            return (
              <>
                <span>{e}</span>
              </>
            );
          })}
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default Viewdetails;
