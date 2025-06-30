import styles from "./sticker.module.css";

export default function Sticker({ sign, size, top = 0, left = 0, right=0 }) {
  return (
    <div
      className={styles.sticker}
      style={{ width: `${size}px`, height: `${size}px`, top: top, left: left, right: right }}
    >
      <div className={styles["sticker-wrapper"]}>
        <span>{sign.toUpperCase()}</span>
      </div>
    </div>
  );
}
