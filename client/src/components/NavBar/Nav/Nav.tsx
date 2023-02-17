import NavLinks from "../NavLinks/NavLinks";
import style from "./Nav.module.css";
const Nav = () => {
  return (
    <div className={style["nav__links-container"]}>
      <NavLinks
        isMobile={false}
        closeMobileMenu={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    </div>
  );
};

export default Nav;
