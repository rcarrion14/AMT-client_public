import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { BotonMetamask } from "../Generales/BotonMetamask";
import BotonBlanco from "../Generales/BotonBlanco";
import { textosExtra, textoBotonesBlancos } from "../../Utils/textos";
//De aca en adelante sin desktop nuevo
interface HomeProps {
  setActivePage: React.Dispatch<React.SetStateAction<string | null>>;
}
const Home: React.FC<HomeProps> = ({ setActivePage }) => {
  const currentLanguage = useSelector(
    (state: typeof RootState) => state.session.language
  );

  const addr = useSelector((state: typeof RootState) => state.wallet.address);

  return (
    <>
      <div className="containerLengueta">
        <h1> {textosExtra[currentLanguage].bienvenido}</h1>
        <div
          className={
            addr ? "containerVideo" : " containerVideo disabledContainer"
          }
        >
          <iframe
            className="video"
            src="https://www.youtube.com/embed/rqUmSyIb4O0?start=121"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
        <p className="textoConexion">
          {textosExtra[currentLanguage].textoConexion}

          <BotonMetamask />
        </p>
        <div className={addr ? undefined : "disabledContainer"}>
          <BotonBlanco
            titulo={textoBotonesBlancos[currentLanguage].market.titulo}
            descripcion={
              textoBotonesBlancos[currentLanguage].market.descripcion
            }
            activador={"marketplace"}
            setActivePage={setActivePage}
            image={"icon_marketplace.png"}
          />
          <BotonBlanco
            titulo={textoBotonesBlancos[currentLanguage].investimentos.titulo}
            descripcion={
              textoBotonesBlancos[currentLanguage].investimentos.descripcion
            }
            activador={"investidores"}
            setActivePage={setActivePage}
            image={"icon_invest.png"}
          />
          <BotonBlanco
            titulo={textoBotonesBlancos[currentLanguage].gInvestidores.titulo}
            descripcion={
              textoBotonesBlancos[currentLanguage].gInvestidores.descripcion
            }
            activador={"gInvestidores"}
            setActivePage={setActivePage}
            image={"icon_grandesInvest.png"}
          />
        </div>
      </div>
    </>
  );
};

export default Home;
