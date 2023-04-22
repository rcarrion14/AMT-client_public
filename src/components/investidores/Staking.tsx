import React from "react";
import CuadroUnimoneda from "../CuadroUnimoneda";

const Staking = ({ setActivePage }) => {
  const infoAllowance = (
    <>
      <p>
        ATENÇÃO: caso seja a primeira vez que você faz staking, você precisará
        aprovar esse contrato inteligente na sua MetaMask. Para isso basta
        clicar em "Habilitar Staking". Depois, sua MetaMask pedirá a sua
        confirmação e fará a cobrança da taxa de gás que é única e típica para
        esse tipo de transação.
      </p>
      <p>
        Depois você poderá clicar em "Fazer staking". Novamente, a sua MetaMask
        irá solicitar a sua confirmação para pagar a taxa de gás da rede. Feito
        isso, o staking estará concluido.
      </p>
    </>
  );
  return (
    <div className="containerSlide">
      <div className="navBar_top">
        <img onClick={() => setActivePage(null)} src="icon_nav.png" />
        <h1>Investimentos</h1>
      </div>

      <h1>Staking Padrão </h1>

      <p>
        Esse é o "Staking Padrão" de AutoMiningToken. Aqui você pode depositar
        seus AMTs e receber BTCB diariamente.
      </p>
      <p>
        A quantia a ser recebida é proporcional a quantidade de tokens que você
        deposita.
      </p>
      <p>
        Você pode simular seus recebimentos<u>clicando aquí</u>
      </p>
      <CuadroUnimoneda />

      <button className="btnTransp"> Consultar historico</button>
    </div>
  );
};

export default Staking;
