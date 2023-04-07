import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import * as Icon from "react-bootstrap-icons";
import { useEffect, useState } from "react";
const DashboardNav: React.FC = () => {
  const [show, setShow] = useState(true);
  const location = useLocation();

  const navigate = useNavigate();
  // Toggle(Open/Close) the Sidebar
  const toggleClick = () => {
    setShow(!show);
  };

  // user navigation
  const navigation = (route: string) => {
    navigate(route);
    // check the size of the window if is < 720 the close after navigation;
    if (window.innerWidth < 720) {
      toggleClick();
    }
  };

  // check path
  const isPath = (path: string) => {
    return location.pathname === path;
  };

  //choose the screen size
  const handleResize = () => {
    if (window.innerWidth < 720) {
      setShow(false);
    } else {
      setShow(true);
    }
  };

  // create an event listener
  useEffect(() => {
    window.addEventListener("resize", handleResize);
  });

  return (
    <div
      className={`dashboard ${
        show ? "grid display-block" : "flex display-none"
      }`}
    >
      {show ? (
        <aside className="side_navigation">
          <div className="side_nav">
            <div className="org_select">
              <i className="icofont-briefcase icofont-2x"></i>
              <select name="" id="">
                <option value="">Switch Organization</option>
              </select>
            </div>

            <button
              onClick={() => navigation("/v1")}
              className={`menu_btn ${isPath("/v1") ? "active" : ""}`}
            >
              <Icon.HouseFill /> Dashboard
            </button>
          </div>

          <div className="other_nav-btn">
            <p className="section_label">CUSTOMERS</p>
            <button
              data-test-id="users"
              onClick={() => navigation("users")}
              className={`menu_btn ${isPath("/v1/users") ? "active" : ""}`}
            >
              <Icon.People /> Users
            </button>
            <button
              onClick={() => navigation("guarantors")}
              className={`menu_btn ${isPath("/v1/guarantors") ? "active" : ""}`}
            >
              <Icon.Person /> Guarantors
            </button>
          </div>
        </aside>
      ) : (
        ""
      )}

      <nav className="nav_header">
        <img
          src={`${process.env.PUBLIC_URL}/img/logo.svg`}
          alt=""
          className="logo"
        />{" "}
        {show ? (
          <Icon.List onClick={toggleClick} />
        ) : (
          <Icon.BackspaceFill onClick={toggleClick} />
        )}
        <div className="search">
          <input
            type="search"
            name=""
            id=""
            placeholder="Search for anything"
          />
          <button>
            <Icon.Search />
          </button>
        </div>
        <div className="right_elements">
          <Link className="doc" to="#">
            Docs
          </Link>
          <button className="notify">
            <Icon.Bell />
          </button>
          <div className="user">
            <img src={`${process.env.PUBLIC_URL}/img/andel.png`} alt="" />
            <button className="user_btn">
              Adedeji
              <Icon.CaretDown />
            </button>
          </div>
        </div>
      </nav>

      <main className="main_content">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardNav;
