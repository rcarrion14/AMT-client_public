import React from "react";
import CuadroBimoneda from "../CuadroBimoneda";

interface AmtStoreInterface {
  setActivePage: React.Dispatch<React.SetStateAction<string>>;
}
const AmtStore: React.FC<AmtStoreInterface> = ({ setActivePage }) => {
  console.log("Store");
  return (
    <div className="containerSlide">
      <div className="navBar_top">
        <img onClick={() => setActivePage("marketplace")} src="icon_nav.png" />
        <h1>Marketplace</h1>
      </div>
      <div className="container">
        <h1>AMT Store</h1>
        <p>
          Esse é o marketplace oficial do AutoMiningToken. Aqui você pode
          comprar seus AMTs e pagar un preço fixo por eles, independentemente da
          quantidade que comprar.
        </p>
        <p>
          Recomenda-se comprar AMT por aqui sempre que o preço estiver menor ou
          igual da PancakeSwap.
        </p>
        <p>
          A compra no AMT Store favorece o projeto como um todo, já que os
          recursos são 100% destinados para novos investimentos no projeto AMT,
          como compra de máquinas de mineração, contratação de pessoas ou
          serviços, etc.
        </p>
        <CuadroBimoneda />
      </div>
    </div>
  );
};

export default AmtStore;
