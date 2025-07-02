export default function ShadowGreen({ size = "200px", left = "0", top = "0" }) {
  const dinamicStyles = {
    position: "absolute",
    zIndex: -1,
    width: size,
    height: size,
    left: left,
    top: top,
  };

  return (
    <div>
      <img src="/shadow.png" alt="green shadow" style={dinamicStyles} />
    </div>
  );
}
