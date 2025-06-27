import HeroItem from "./components/hero-item";
import styles from "./hero-frame.module.css"
import heart from "../../../../assets/heart.png"
import rocket from "../../../../assets/rocket.png"
import lave from "../../../../assets/lave.png"

export default function HeroFrame() {
    return (
        <div className={styles.container}>
            <div className={styles['hero-frame']}>
                <HeroItem image={heart} title={'Tasty'} description={'We have the most delicious coffee'}/>
                <HeroItem image={rocket} title={'Fast'} description={'Our cafe will serve you quickly'}/>
                <HeroItem image={lave} title={'Available'} description={'Cafe will serveat the most pleasant prices'}/>
            </div>
        </div>
    );
}