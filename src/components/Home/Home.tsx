import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { BotonMetamask } from "../Generales/BotonMetamask";
import BotonBlanco from "../Generales/BotonBlanco";
import { textosExtra, textoBotonesBlancos } from "../../Utils/textos";
//Base desktop
interface HomeProps {
  setActivePage: React.Dispatch<React.SetStateAction<string | null>>;
}
declare var ethereum: any;
const Home: React.FC<HomeProps> = ({ setActivePage }) => {
  const currentLanguage = useSelector(
    (state: typeof RootState) => state.session.language
  );

  const chain = ethereum.networkVersion;

  const addr = useSelector((state: typeof RootState) => state.wallet.address);

  return (
    <>
      <div className="containerLengueta">
        <h1> {textosExtra[currentLanguage].bienvenido}</h1>

        <p className="textoConexion">
          {textosExtra[currentLanguage].textoConexion}

          <BotonMetamask />
        </p>
        <div
          className={addr && chain === "56" ? undefined : "disabledContainer"}
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
