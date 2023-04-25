import React from 'react'

const tradingView = () => {
  return (
    <>
    <div className="tradingview-widget-container">
      <div id="tradingview_b29d2"></div>
      <div className="tradingview-widget-copyright"><a href="https://www.tradingview.com/symbols/AMTUSD_66CD75/?exchange=PANCAKESWAP" rel="noopener" target="_blank"><span class="blue-text">AMTUSD_66CD75 chart</span></a> by TradingView</div>
      <script type="text/javascript" src="https://s3.tradingview.com/tv.js"></script>
      <script type="text/javascript">
      new TradingView.widget(
      {
      "autosize": true,
      "symbol": "PANCAKESWAP:AMTUSD_66CD75",
      "interval": "D",
      "timezone": "Etc/UTC",
      "theme": "light",
      "style": "1",
      "locale": "en",
      "toolbar_bg": "#f1f3f6",
      "enable_publishing": false,
      "hide_legend": true,
      "save_image": false,
      "container_id": "tradingview_b29d2"
    }
      );
      </script>
    </div>
    </>
  )
}

export default tradingView