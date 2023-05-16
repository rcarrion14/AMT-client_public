interface NavBarProps {
  setActivePage: (page: string) => void;
  activePage: string | null;
}

const NavBar: React.FC<NavBarProps> = ({ setActivePage, activePage }) => {
  return (
    <div className="navBar">
      <img
        onClick={() => {
          setActivePage("home");
        }}
        className={activePage == "home" ? "activeIcon" : undefined}
        src="icon_home.png"
      />
      <img
        onClick={() => {
          setActivePage("marketplace");
        }}
        className={activePage == "marketplace" ? "activeIcon" : undefined}
        src="icon_marketplace.png"
      />
      <img
        onClick={() => {
          setActivePage("investidores");
        }}
        className={activePage == "investidores" ? "activeIcon" : undefined}
        src="icon_invest.png"
      />
      <img
        onClick={() => {
          setActivePage("gInvestidores");
        }}
        className={activePage == "gInvestidores" ? "activeIcon" : undefined}
        src="icon_grandesInvest.png"
      />
    </div>
  );
};

export default NavBar;
