import { NavLink } from "react-router-dom";

const TopNavOwner = () => {
    return (
    <div className="max-w-screen-xl mx-auto navbar bg-base-100 px-2 py-4 min-h-1">
        <div role="tablist" className="tabs tabs-bordered"></div>
        <div className="navbar flex font-normal text-lg p-0 min-h-1">
        <button className="btn btn-ghost text-xl font-medium">
            <NavLink
            to="/owner/ground"
            className={({ isActive }) => (isActive ? "font-bold" : "")}
            >
            구장관리
            </NavLink>
        </button>
        <button className="btn btn-ghost text-xl font-medium">
            <NavLink
            to="/owner/reserve/list"
            className={({ isActive }) => (isActive ? "font-bold" : "")}
            >
            예약관리
            </NavLink>
        </button>
        <button className="btn btn-ghost text-xl font-medium">
            <NavLink
            to="/owner/statistics"
            className={({ isActive }) => (isActive ? "font-bold" : "")}
            >
            통계관리
            </NavLink>
        </button>
        <button className="btn btn-ghost text-xl font-medium">
            <NavLink
            to="/owner/notice"
            className={({ isActive }) => (isActive ? "font-bold" : "")}
            >
            공지사항
            </NavLink>
        </button>
        </div>
    </div>
    );
};

export default TopNavOwner;
