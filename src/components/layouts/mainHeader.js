import { Link, Navigate, createSearchParams, useNavigate } from "react-router-dom"


const MainHeader = ({children}) => {

    return (
      <div className="max-w-screen-xl mx-auto navbar bg-base-100 p-2 ">
        <div className="flex-1">
          <Link to={"/"} className="btn btn-ghost text-xl p-0">
            골라차
          </Link>
        </div>
        <div className="flex-none gap-2">
          <div className="form-control">
            <input
              type="text"
              placeholder="지역, 구장명으로 찾기"
              className="input input-bordered w-24 md:w-auto"
            />
          </div>
          <Link to={"/login"}>
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img alt="Tailwind CSS Navbar component" src="/img/user.png" />
              </div>
            </div>
          </Link>

          {/* <div className="dropdown dropdown-end"> 드롭다운버전
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component" 
                  src="/img/user.png"
                />
              </div>              
            </div>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div> */}
        </div>
      </div>
    );
  }


export default MainHeader;
