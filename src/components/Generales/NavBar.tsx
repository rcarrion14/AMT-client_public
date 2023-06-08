interface NavBarProps {
  setActivePage: (page: string) => void;
  activePage: string | null;
}

const NavBar: React.FC<NavBarProps> = ({ setActivePage, activePage }) => {
  return (
    <div className="navBar">
      <img
        onClick={() => {
          window.scrollTo(0, 0);
          setActivePage("home");
          (document.getElementsByClassName("containerSlide")[0] as HTMLElement).hidden = true
        }}
        className={activePage == "home" ? "activeIcon" : undefined}
        src="icon_home.png"
      />
      <img
        onClick={() => {
          window.scrollTo(0, 0);
          setActivePage("marketplace");
          (document.getElementsByClassName("containerSlide")[0] as HTMLElement).hidden = true
        }}
        className={activePage == "marketplace" ? "activeIcon" : undefined}
        src="icon_marketplace.png"
      />
      <img
        onClick={() => {
          window.scrollTo(0, 0);
          setActivePage("investidores");
          (document.getElementsByClassName("containerSlide")[0] as HTMLElement).hidden = true
        }}
        className={activePage == "investidores" ? "activeIcon" : undefined}
        src="icon_invest.png"
      />
      <img
        onClick={() => {
          window.scrollTo(0, 0);
          setActivePage("gInvestidores");
          (document.getElementsByClassName("containerSlide")[0] as HTMLElement).hidden = true
        }}
        className={activePage == "gInvestidores" ? "activeIcon" : undefined}
        src="icon_grandesInvest.png"
      />
    </div>
  );
};

export default NavBar;
