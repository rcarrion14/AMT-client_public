import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { BotonMetamask } from "../Generales/BotonMetamask";
import BotonBlanco from "../Generales/BotonBlanco";
import { textosExtra, textoBotonesBlancos } from "../../Utils/textos";
import { useEffect, useState } from "react";
//Base desktop
interface HomeProps {
  setActivePage: React.Dispatch<React.SetStateAction<string | null>>;
}
declare var ethereum: any;
const Home: React.FC<HomeProps> = ({ setActivePage }) => {
  const currentLanguage = useSelector(
    (state: typeof RootState) => state.session.language
  );

  let chain = undefined;
  const [chainId, setChainId] = useState<string | number | undefined>(
    undefined
  );
  const addr = useSelector((state: typeof RootState) => state.wallet.address);
  const provider = useSelector(
    (state: typeof RootState) => state.wallet.provider
  );
  const checkChainId = async () => {
    if ((window as any).ethereum) {
      setChainId(
        await (window as any).ethereum.request({ method: "eth_chainId" })
      );
    }
  };

  // Using useEffect to show the toast on component mount
  useEffect(() => {
    checkChainId();
  }, [provider]);
  return (
    <>
      <div className="containerLengueta">
        <h1> {textosExtra[currentLanguage].bienvenido}</h1>

        <p className="textoConexion">
          {textosExtra[currentLanguage].textoConexion}

          <BotonMetamask />
        </p>
        <div
          className={
            addr &&
            (chain === "56" ||
              chain == 56 ||
              chainId === "0x38" ||
              chainId === 0x38)
              ? undefined
              : "disabledContainer"
          }
        >
          <BotonBlanco
            titulo={textoBotonesBlancos[currentLanguage].market.titulo}
            descripcion={
              textoBotonesBlancos[currentLanguage].market.descripcion
            }
            activador={"marketplace"}
            setActivePage={setActivePage}
            image={"icon_marketplace.png"}
            scroll={true}
          />
          <BotonBlanco
            titulo={textoBotonesBlancos[currentLanguage].investimentos.titulo}
            descripcion={
              textoBotonesBlancos[currentLanguage].investimentos.descripcion
            }
            activador={"investidores"}
            setActivePage={setActivePage}
            image={"icon_invest.png"}
            scroll={true}
          />
          <BotonBlanco
            titulo={textoBotonesBlancos[currentLanguage].gInvestidores.titulo}
            descripcion={
              textoBotonesBlancos[currentLanguage].gInvestidores.descripcion
            }
            activador={"gInvestidores"}
            setActivePage={setActivePage}
            image={"icon_grandesInvest.png"}
            scroll={true}
          />
        </div>
      </div>
    </>
  );
};

export default Home;
