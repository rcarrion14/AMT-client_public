import React, { useEffect, useRef, useState } from "react";
import { textosExtra } from "../../../../Utils/textos";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
interface GraficoInterface {
  setActivePage: React.Dispatch<React.SetStateAction<string>>;
}
const Grafico: React.FC<GraficoInterface> = ({ setActivePage }) => {
  const contariner = useRef<HTMLDivElement | null>(null);
  const currentLanguage = useSelector(
    (state: typeof RootState) => state.session.language
  );

  useEffect(() => {
    if (contariner.current) {
      const script = document.createElement("script");
      script.src =
        "https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = `
          {
            "symbols": [
              [
                "PANCAKESWAP:AMTUSD_66CD75|3M"
                
              ],
              ["PANCAKESWAP:AMTBTCB_66CD75|3M"
                
              ]
            ],
            "chartOnly": false,
            "width": "100%",
            "height": "100%",
            "locale": "en",
            "colorTheme": "light",
            "autosize": true,
            "showVolume": false,
            "showMA": false,
            "hideDateRanges": false,
            "hideMarketStatus": true,
            "hideSymbolLogo": false,
            "scalePosition": "right",
            "scaleMode": "Normal",
            "fontFamily": "-apple-system, BlinkMacSystemFont, Trebuchet MS, Roboto, Ubuntu, sans-serif",
            "fontSize": "10",
            "noTimeScale": false,
            "valuesTracking": "1",
            "changeMode": "no-values",
            "chartType": "area",
            "maLineColor": "#2962FF",
            "maLineWidth": 1,
            "maLength": 9,
            "lineWidth": 2,
            "lineType": 0
          }`;
      contariner.current.appendChild(script);
    }
  }, []);

  return (
    <div className="containerSlide">
      <div className="navBar_top">
        <img onClick={() => setActivePage("")} src="icon_nav.png" />
        <h1>{textosExtra[currentLanguage].inversiones}</h1>
      </div>
      <div className="tradingview-widget-container" ref={contariner}>
        <div className="tradingview-widget-container__widget"></div>
      </div>
    </div>
  );
};

export default Grafico;
