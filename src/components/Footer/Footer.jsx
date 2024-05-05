import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  const [activeMember, setActiveMember] = useState(null);

  const handleMemberBtn = (index) => {
    if (activeMember === index) {
      setActiveMember(null);
    } else {
      setActiveMember(index);
    }
  };

  const teamMemeberInfoMap = [
    {
      name: process.env.REACT_APP_TEAM_MEMBER_1_NAME,
      position: process.env.REACT_APP_TEAM_MEMBER_1_POSITION,
      email: process.env.REACT_APP_TEAM_MEMBER_1_EMAIL,
      github: process.env.REACT_APP_TEAM_MEMBER_1_GITHUB,
      blog: process.env.REACT_APP_TEAM_MEMBER_1_BLOG,
      phone: process.env.REACT_APP_TEAM_MEMBER_1_PHONE,
    },
    {
      name: process.env.REACT_APP_TEAM_MEMBER_2_NAME,
      position: process.env.REACT_APP_TEAM_MEMBER_2_POSITION,
      email: process.env.REACT_APP_TEAM_MEMBER_2_EMAIL,
      github: process.env.REACT_APP_TEAM_MEMBER_2_GITHUB,
      blog: process.env.REACT_APP_TEAM_MEMBER_2_BLOG,
      phone: process.env.REACT_APP_TEAM_MEMBER_2_PHONE,
    },
    {
      name: process.env.REACT_APP_TEAM_MEMBER_3_NAME,
      position: process.env.REACT_APP_TEAM_MEMBER_3_POSITION,
      email: process.env.REACT_APP_TEAM_MEMBER_3_EMAIL,
      github: process.env.REACT_APP_TEAM_MEMBER_3_GITHUB,
      blog: process.env.REACT_APP_TEAM_MEMBER_3_BLOG,
      phone: process.env.REACT_APP_TEAM_MEMBER_3_PHONE,
    },
    {
      name: process.env.REACT_APP_TEAM_MEMBER_4_NAME,
      position: process.env.REACT_APP_TEAM_MEMBER_4_POSITION,
      email: process.env.REACT_APP_TEAM_MEMBER_4_EMAIL,
      github: process.env.REACT_APP_TEAM_MEMBER_4_GITHUB,
      blog: process.env.REACT_APP_TEAM_MEMBER_4_BLOG,
      phone: process.env.REACT_APP_TEAM_MEMBER_4_PHONE,
    },
  ];

  return (
    <div className="footer">
      <div className="footer-left">
        <div className="section section1">
          <h4>C.S Center</h4>
          <Link to="/inquiry">Q&A</Link>
        </div>
        <div className="section section2">
          <h4>TEAM MEMBERS</h4>
          <div className="footer-box2">
            {teamMemeberInfoMap.map((teamMember, index) => (
              <Link key={index} onClick={() => handleMemberBtn(index)}>
                {teamMember.name} : {teamMember.position}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="footer-right">
        {teamMemeberInfoMap.map((teamMember, index) => {
          return (
            <div
              key={index}
              className={`section section3 ${
                activeMember === index ? "member-card-active" : ""
              }`}
            >
              <div className="member-card-top">
                <img
                  src="/ODD_LOGO_FULL.png"
                  alt="ODD Logo"
                  className="member-card-logo"
                />
              </div>
              <div className="member-card-contents">
                <div className="mc-name-position">
                  <span>{teamMember.name}</span>
                  <span>{teamMember.position}</span>
                </div>
                <div className="mc-border-line"></div>
                <div className="mc-contact-info">
                  <span>{`E-Mail : ${teamMember.email}`}</span>
                  <span>
                    {`GitHub : `}
                    <Link to={teamMember.github} target="_black">
                      {teamMember.github}
                    </Link>
                  </span>
                  <span>
                    {`Blog   : `}
                    <Link to={teamMember.blog} target="_black">
                      {teamMember.blog}
                    </Link>
                  </span>
                  <span>{`Phone  : ${teamMember.phone}`}</span>
                </div>
              </div>
            </div>
          );
        })}
        <span className="floating-message">
          {`=>`} Click member to show member card!
        </span>
      </div>
    </div>
  );
}

export default Footer;
