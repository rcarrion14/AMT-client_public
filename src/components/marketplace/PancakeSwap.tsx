import React from "react";
import CuadroBimoneda from "../CuadroBimoneda";

const PancakeSwap = ({ setActivePage }) => {
  return (
    <div className="containerSlide">
      <div className="navBar_top">
        <img onClick={() => setActivePage(null)} src="icon_nav.png" />
        <h1>Marketplace</h1>
      </div>
      <div className="container">
        <h1>PancakeSwap</h1>
        <p>Esse é o marketplace da PancakeSwap.</p>
        <p>
          Recomenda-se comprar AMT por aqui sempre que o preço estiver menor que
          o da AMT Store.
        </p>
        <p>
          O preço do AMT na PancakeSwap depende, dentre outros fatores, da
          quantia que está sendo transacionada: quanto mais AMT você compra,
          mais caro eles ficam.
        </p>
        <CuadroBimoneda />
      </div>
    </div>
  );
};

export default PancakeSwap;

/*      <iframe
src="https://pancakeswap.finance/swap?theme=dark&use=v2&inputCurrency=0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c&outputCurrency=0x6Ae0A238a6f51Df8eEe084B1756A54dD8a8E85d3"
height="660px"
width="100%"
className="pancake"
      />*/
