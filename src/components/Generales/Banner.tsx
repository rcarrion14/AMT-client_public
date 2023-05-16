import LanguageSelector from "./LanguageSelector";
const Banner = () => {
  return (
    <>
      <div className="containerBanner">
        <img src="auto-mining-logo.png" alt="" />
        <div>
          <LanguageSelector></LanguageSelector>
        </div>
      </div>
    </>
  );
};

export default Banner;
