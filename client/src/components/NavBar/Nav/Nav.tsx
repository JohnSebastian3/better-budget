import NavLinks from "../NavLinks/NavLinks";
import classes from "./Nav.module.css";
const Nav = () => {
  return (
    <nav className={classes.navigation}>
      <NavLinks
        isMobile={false}
        closeMobileMenu={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    </nav>
  );
};

export default Nav;
