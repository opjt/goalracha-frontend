import { NavLink } from 'react-router-dom';


const Topnav = () => {
  
    return (
        <div className="max-w-screen-xl mx-auto navbar bg-base-100 px-2 py-4 min-h-1">
          <div role="tablist" className="tabs tabs-bordered"></div>
            <div className="navbar flex font-normal text-lg p-0 min-h-1">
            <button className="btn btn-ghost text-xl font-medium">
              <NavLink
                to="/reserve"
                className={({ isActive }) =>
                  isActive ? "font-bold" : ""
                }
              >
                구장예약
              </NavLink>
            </button>
            <button className="btn btn-ghost text-xl ml-5 font-medium">
              <NavLink
                to="/notice"
                className={({ isActive }) =>
                  isActive ? "font-bold" : ""
                }
              >
                공지사항
              </NavLink>
            </button>
          </div>
      </div>
    );
}

export default Topnav;
