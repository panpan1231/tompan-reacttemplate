import React, { useEffect, useState, useRef } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import "./style.scss";
export default ({ imgs }) => {
  useEffect(() => {}, [imgs]);
  return (
    <>
      {!!imgs.length ? (
        <Carousel
          className="carouselComponent"
          showArrows={false}
          showStatus={false}
          showThumbs={false}
          infiniteLoop={true}
          // stopOnHover={true}
          preventMovementUntilSwipeScrollTolerance={true}
          transitionTime="1000"
          interval="3000"
          autoPlay={true}
          width="95vw"
          dynamicHeight={false}
          swipeable={true}
        >
          {imgs.map((item) => (
            <div key={item.id}>
              <img alt="" width="100%" height="auto" src={item.img} />
            </div>
          ))}
        </Carousel>
      ) : (
        ""
      )}
    </>
  );
};
