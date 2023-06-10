interface NavBarProps {
  setActivePage: (page: string) => void;
  activePage: string | null;
}

const hideElements = () => {
  try {
    (
      document.getElementsByClassName("containerSlide")[0] as HTMLElement
    ).hidden = true;
    (
      document.getElementsByClassName("containerSlide")[1] as HTMLElement
    ).hidden = true;
  } catch {}
};

const NavBar: React.FC<NavBarProps> = ({ setActivePage, activePage }) => {
  return (
    <div className="navBar">
      <img
        onClick={() => {
          window.scrollTo(0, 0);
          setActivePage("home");
          hideElements();
        }}
        className={activePage == "home" ? "activeIcon" : undefined}
        src="icon_home.png"
      />
      <img
        onClick={() => {
          window.scrollTo(0, 0);
          setActivePage("marketplace");
          hideElements();
        }}
        className={activePage == "marketplace" ? "activeIcon" : undefined}
        src="icon_marketplace.png"
      />
      <img
        onClick={() => {
          window.scrollTo(0, 0);
          setActivePage("investidores");
          hideElements();
        }}
        className={activePage == "investidores" ? "activeIcon" : undefined}
        src="icon_invest.png"
      />
      <img
        onClick={() => {
          window.scrollTo(0, 0);
          setActivePage("gInvestidores");
          hideElements();
        }}
        className={activePage == "gInvestidores" ? "activeIcon" : undefined}
        src="icon_grandesInvest.png"
      />
    </div>
  );
};

export default NavBar;
