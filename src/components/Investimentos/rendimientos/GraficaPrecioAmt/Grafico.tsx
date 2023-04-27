// TradingViewWidget.jsx

import React, { useEffect, useRef } from "react";

let tvScriptLoadingPromise;

export default function Grafico() {
  const onLoadScriptRef = useRef();

  useEffect(() => {
    onLoadScriptRef.current = createWidget;

    if (!tvScriptLoadingPromise) {
      tvScriptLoadingPromise = new Promise((resolve) => {
        const script = document.createElement("script");
        script.id = "tradingview-widget-loading-script";
        script.src = "https://s3.tradingview.com/tv.js";
        script.type = "text/javascript";
        script.onload = resolve;

        document.head.appendChild(script);
      });
    }

    tvScriptLoadingPromise.then(
      () => onLoadScriptRef.current && onLoadScriptRef.current()
    );

    return () => (onLoadScriptRef.current = null);

    function createWidget() {
      if (
        document.getElementById("tradingview_be037") &&
        "TradingView" in window
      ) {
        new window.TradingView.widget({
          autosize: true,
          symbol: "PANCAKESWAP:AMTBTCB_66CD75",
          interval: "D",
          timezone: "Etc/UTC",
          theme: "light",
          style: "1",
          locale: "en",
          toolbar_bg: "#f1f3f6",
          enable_publishing: false,
          hide_legend: true,
          allow_symbol_change: true,
          save_image: false,
          container_id: "tradingview_be037",
        });
      }
    }
  }, []);

  return (
    <div className="tradingview-widget-container">
      <div id="tradingview_be037" />
      <div className="tradingview-widget-copyright">
        <a
          href="https://www.tradingview.com/symbols/AMTBTCB_66CD75/?exchange=PANCAKESWAP"
          rel="noopener"
          target="_blank"
        >
          <span className="blue-text">AMTBTCB_66CD75 chart</span>
        </a>{" "}
        by TradingView
      </div>
    </div>
  );
}
