import "flag-icon-css/css/flag-icons.css";

import {
  languageCode,
  setLanguage,
} from "../../store/features/session/sessionSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../store/store";

const LanguageSelector = () => {
  const languages: Array<languageCode> = ["esp", "por", "eng"];
  const languageCodesForFlags = ["es", "br", "us"];
  const dispatch = useDispatch<AppDispatch>();

  const currentLanguage = useSelector(
    (state: typeof RootState) => state.session.language
  );

  return (
    <>
      <div className="containerLanguageSelector">
        {languages.map((language) => (
          <span
            key={language}
            onClick={() => {
              dispatch(setLanguage(language));
            }}
            style={{
              cursor: "pointer",
              fontWeight: currentLanguage == language ? "bold" : "normal",
              margin: "10px 10px 10px 10px",
            }}
          >
            <a
              key={language}
              className={`flag-icon flag-icon-${languageCodesForFlags[
                languages.indexOf(language)
              ].toLowerCase()}`}
              onClick={() => dispatch(setLanguage(language))}
            ></a>

            {language.toLocaleUpperCase()}
          </span>
        ))}
      </div>
    </>
  );
};

export default LanguageSelector;
