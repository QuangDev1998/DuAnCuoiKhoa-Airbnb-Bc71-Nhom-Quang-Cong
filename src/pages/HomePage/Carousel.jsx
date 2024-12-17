import React from "react";
import videoBanner from "../../assets/image/videoBanner.mp4";
import swooshHero from "../../assets/image/swoosh-hero.png";
import airbnbLogo from "../../assets/image/airbnb-1.aabeefedaf30b8c7011a022cdb5a6425.png";

export default function Carousel() {
  return (
    <div className="w-full relative flex flex-col items-center smm:h-[50vh] md:h-[60vh] lg:h-[50vh] 2xl:h-[80vh]">
      <div className="absolute w-full h-full">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute w-full h-full object-cover"
        >
          <source src={videoBanner} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Overlay */}
        <div className="absolute w-full h-full bg-black opacity-50"></div>
      </div>

      {/* Logo and Text */}
      <div className="absolute z-10 left-48 top-[40%] text-white">
        <div className="flex flex-col items-start">
          <div className="flex items-center space-x-4">
            <img src={airbnbLogo} alt="Airbnb Logo" className="h-16" />
            <h1 className="text-7xl font-bold text-primary">airbnb</h1>
          </div>
          <p className="text-3xl mt-2">Belong anywhere</p>
        </div>
      </div>

      {/* Swoosh Hero Image */}
      <div className="absolute bottom-[-50px] left-0 w-full z-20">
        <img
          src={swooshHero}
          alt="Swoosh Hero"
          className="w-full object-cover"
        />
      </div>
    </div>
  );
}
