import styles from "./sticker.module.css";

export default function Sticker({ sign, size = 100, top = 0, left = 0, right = 0 }) {
const dynamicStyle = {
    width: `${size}px`,
    height: `${size}px`,
    top: top,
    left: left,
    right:right
};

  return (
    <div className={styles.sticker} style={dynamicStyle}>
      <div className={styles["sticker-wrapper"]}>
        <span>{sign.toUpperCase()}</span>
      </div>
    </div>
  );
}
