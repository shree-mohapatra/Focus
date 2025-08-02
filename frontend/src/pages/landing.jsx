import React from "react";
import "../App.css";
import { Link, useNavigate } from "react-router-dom";

export default function Landing() {
  const router = useNavigate();

  return (
    <div className="landingContainer">
      <nav>
        <div className="navheader">
          <h2>
            Focus <i className="fa-solid fa-users-rectangle"></i>
          </h2>
        </div>

        <div className="navlist">
          <p
            onClick={() => {
              router("/sjdcvg");
            }}
          >
            Join as Guest
          </p>

          <p
            onClick={() => {
              router("/auth");
            }}
            role="button"
          >
            Register
          </p>

          <div
            onClick={() => {
              router("/auth");
            }}
            role="button"
          >
            <p>Login</p>
          </div>
        </div>
      </nav>

      <div className="landingMainContainer">
        <div>
          <h2>
            <span style={{ color: "#f6a833ff" }}>Connect</span> with your loved
            ones
          </h2>
          <p>Cover a distance by Focus</p>
          <div role="button" className="small">
            <Link to={"/auth"}>Get Started</Link>
          </div>
        </div>
        <div>
          <img src="/mobile.png" alt="img" />
        </div>
      </div>
    </div>
  );
}
