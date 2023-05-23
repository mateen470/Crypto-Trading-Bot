import { useState, useEffect } from "react";

const Circle = ({ index, total, radius, label }) => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const ellipseFactor = 1.2;
  const angle = 100 * (index / (total - 1));

  useEffect(() => {
    const angleRad = (Math.PI / 170) * (200 + angle);
    const xPos = radius * Math.cos(angleRad) * ellipseFactor;
    const yPos = radius * Math.sin(angleRad);

    setX(xPos);
    setY(yPos);
  }, [angle, radius, ellipseFactor]);

  return (
    <div
      style={{
        position: "absolute",
        top: `calc(60% + ${y}px)`,
        left: `calc(50% + ${x}px)`,
        transform: "translate(-50%, -50%)",
        width: 35,
        height: 35,
        borderRadius: "50%",
        backgroundColor: "#553958",
        boxShadow:
          "2px 2px 2px 2px rgba(0,0,0,0.2) ,inset 0px 0px 2px 2px #6B4374",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontSize: "0.5rem",
      }}
    >
      <p style={{ borderBottom: "1px solid white" }}> {label}</p>
    </div>
  );
};
export default Circle;
