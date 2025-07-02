import "./slider.css";
export default function SliderCard({ image, title, description }) {
  return (
    <div className="slider-item">
      <div className="slider-icon">
        <div className="slider-bounce" />
        <img src={image} alt="icon" />
      </div>
      <div className="slider-heading">
        <div className="slider-title">
          <h4>{title}</h4>
        </div>
        <div className="slider-description">
          <span>{description}</span>
        </div>
        <div className="slider-price">
          <span className="price">7,45$</span>
          <span className="capacity">330ml</span>
        </div>
      </div>
    </div>
  );
}
