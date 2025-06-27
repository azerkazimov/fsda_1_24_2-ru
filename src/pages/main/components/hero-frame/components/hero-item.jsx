import "./hero-item.css";

export default function HeroItem({ image, title, description }) {
  return (
    <div className="hero-item">
      <div className="hero-icon">
        <div className="bounce" />
        <img src={image} alt="icon" />
      </div>
      <div className="hero-heading">
        <div className="hero-title">
          <h4>{title}</h4>
        </div>
        <div className="hero-description">
          <span>{description}</span>
        </div>
      </div>
    </div>
  );
}
