import Delicios from "./components/delicios/delicios";
import HeroFrame from "./components/hero-frame/hero-frame";
import Hero from "./components/hero/hero";
import "./main.css";

export default function Main() {

  return (
      <div className="main">
        <Hero/>
        <HeroFrame/>
        <Delicios/>
      </div>

  );
}
