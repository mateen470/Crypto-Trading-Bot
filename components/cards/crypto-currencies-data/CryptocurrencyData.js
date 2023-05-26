import React, { useEffect, useState } from "react";
import { WidthProvider, Responsive } from "react-grid-layout";

const ResponsiveGridLayout = WidthProvider(Responsive);

const CryptocurrencyData = (props) => {
  const [cryptocurrencies, setCryptocurrencies] = useState([]);

  useEffect(() => {
    setCryptocurrencies(props.data);
  }, [props.data]);
  // const cryptocurrencies = [
  //   { name: "BTC", abrevation: "Bitcoin", points: "-1.8%" },
  //   { name: "ETH", abrevation: "ethereum", points: "-5.4%" },
  //   { name: "BNB", abrevation: "BNB", points: "-2.5%" },
  //   { name: "XRP", abrevation: "XRP", points: "-1.9%" },
  //   { name: "ADA", abrevation: "Cardano", points: "-3.6%" },
  // ];
  const getBackgroundColor = (index) => {
    const isSecondBox = index % 4 === 1;
    const isFourthBox = index % 4 === 3;
    const isSecondRowInFourRows = Math.floor(index / 4) % 4 === 1;

    if (isSecondRowInFourRows && (isSecondBox || isFourthBox)) {
      return "#009B10";
    } else {
      return "#830D0D";
    }
  };
  const generateLayouts = () => {
    const layouts = [];
    let currentX = 0;
    let currentY = 0;
    const numRows = Math.ceil(cryptocurrencies.length / 4);

    for (let row = 0; row < numRows; row++) {
      for (let col = 0; col < 4; col++) {
        const index = row * 4 + col;
        const isSecondBox = col === 1;
        const isThirdBox = col === 2;
        const isLastBoxInSecondColumn =
          index === cryptocurrencies.length - 1 && isSecondBox;

        let height = 2.1;
        let width = 1.8;
        if (isSecondBox && !isLastBoxInSecondColumn) {
          height = 2;
          width = 1.1;
        } else if ((row + 1) % 4 === 3 && col === 2) {
          height = 2.1;
          width = 1.8;
        } else if (
          ((row + 1) % 4 === 1 && (col === 2 || col === 3)) ||
          ((row + 1) % 4 === 2 && col === 3)
        ) {
          height = 3.2;
          width = 0.9;
        } else if (col == 0) {
          height = 2.5;
          width = 1.1;
        } else if (index % 16 === 6) {
          height = 3.2;
          width = 0.9;
        }
        currentX = col * 1.1;

        layouts.push({
          i: index.toString(),
          x: currentX,
          y: currentY,
          w: width,
          h: height,
        });

        currentX += width;
      }

      currentX = 0;
      currentY += 2;
    }

    return layouts;
  };

  const layouts = {
    lg: generateLayouts(),
  };

  const boxStyle = (index) => ({
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    padding: "10px",
    boxSizing: "border-box",
    backgroundColor: getBackgroundColor(index),
  });

  const textStyle = {
    fontWeight: "normal",
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
  };
  const headingStyle = {
    fontWeight: "500",
    fontSize: "18px",
  };

  return (
    <div
      style={{
        margin: "0 auto",
        width: "800px",
        background: "rgba(41, 8, 77, 0.42)",
        minHeight: 600,
        width: "41vw",
        borderRadius: 7,
        marginTop: "24px",
      }}
    >
      <ResponsiveGridLayout
        className="layout"
        layouts={layouts}
        rowHeight={50}
        cols={{ lg: 4, md: 4, sm: 4, xs: 4, xxs: 4 }}
      >
        {cryptocurrencies.map((crypto, index) => (
          <div key={index} style={boxStyle(index)}>
            <div style={headingStyle}>{crypto.asset}</div>
            <div style={textStyle}>{crypto.balance}</div>
            <div style={textStyle}>
              {parseFloat(crypto.change) === 0
                ? "NA"
                : parseFloat(crypto.change) > 0
                ? `+${crypto.change}%`
                : `-${crypto.change}%`}
            </div>
          </div>
        ))}
      </ResponsiveGridLayout>
    </div>
  );
};

export default CryptocurrencyData;
