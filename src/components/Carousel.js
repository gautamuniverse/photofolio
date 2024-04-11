import { useEffect, useState } from "react";
import left_pointer from "../images/left_pointer.png";
import right_pointer from "../images/right_pointer.png";
import default_img from "../images/default_img.jpg";
import close from "../images/close.png";

//This function will be used to show a carousel view of the images within an Album.
function Carousel(props) {
  const [currentIndex, setCurrentIndex] = useState(props.index);

  useEffect(() => {
  }, [])

  return (
    <div className="carousel-container">
         <div className="close-carousel">
            <img
              className="carousel-close"
              src={close}
              alt="close-carousel"
              onClick={() => props.setCarouselVisible(false)}
            />
          </div>
      {props.imagesArray.length > 0 ? (
        <div className="carousel-view">
          <div className="carousel-image-container">
            <img
            className="carousel-img"
              src={props.imagesArray[currentIndex].data.url}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = default_img;
              }}
              alt={props.imagesArray[currentIndex].data.title}
            />
          </div>
          <div className="left-pointer-container">
            <img
            className="prev-img"
              src={left_pointer}
              alt="previous_img"
              onClick={() =>
                setCurrentIndex((prev) =>
                  prev - 1 < 0 ? props.imagesArray.length - 1 : prev - 1
                )
              }
            />
          </div>
          <div className="right-pointer-container">
            <img
            className="next-img"
              src={right_pointer}
              alt="next_img"
              onClick={() =>
                setCurrentIndex((prev) => (prev + 1) % props.imagesArray.length)
              }
            />
          </div>
        </div>
      ) : (
        <div className="no-images-view"> </div>
      )}
    </div>
  );
}

export default Carousel;
