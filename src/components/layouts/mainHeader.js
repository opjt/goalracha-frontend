import {
  Link,
  useNavigate,
  createSearchParams,
  useLocation,
} from "react-router-dom";
import { useState ,useEffect} from "react";
import { update } from "slices/searchSlice";
import { useDispatch } from "react-redux";
import useCustomLogin from "hooks/useCustomLogin";
const MainHeader = ({ children }) => {
	const [searchInput, setSearchInput] = useState(""); // 입력된 값의 상태
	const dispatch = useDispatch();
  	const navigate = useNavigate();
	const location = useLocation();
	const { loginState, isLogin,moveToPath } = useCustomLogin();
	//유저아이콘클릭시 이동주소
	var myPageUrl = "/user/mypage";
	if(loginState.type && loginState.type != '') {
		myPageUrl = `/${loginState.type}/mypage`
		if(loginState.type=="ADMIN") {
			myPageUrl = '/adminPage'
		}
	} 

	useEffect(() => {
        if(isLogin) {
			console.log(loginState)
            if(loginState.email === loginState.nickname) {
               moveToPath("/user/join")
            }
       }
    })
	
	
	const handleInputChange = (e) => {
		setSearchInput(e.target.value); // 입력된 값으로 상태를 업데이트
	};

	// 엔터 키를 누르면 호출되는 함수
	const handleKeyPress = (e) => {
		if (e.nativeEvent.isComposing) {
		//한글 입력이슈
		return;
		}
		if (e.key === "Enter") {
		dispatch(update(searchInput)); // Redux 상태 업데이트
		setSearchInput("");
		console.log("Current Path:", location.pathname); // 현재 경로 출력
		if (!location.pathname !== "reserve") {
			navigate({ pathname: "/reserve" });
		}
		}
	};

	return (
		<div className="max-w-screen-xl mx-auto navbar bg-base-100 p-2 ">
		<div className="flex-1">
			<Link to={"/"}>
			<img src="/goalracha_logo.png" alt="골라차" className="h-14" />
			</Link>
		</div>
		<div className="flex-none gap-2">
			<div className="form-control">
			<input
				type="text"
				placeholder="지역, 구장명으로 찾기"
				className="input input-bordered w-auto max-md:w-36"
				value={searchInput} // 입력된 값 바인딩
				onChange={handleInputChange} // 값이 변경될 때마다 호출
				onKeyDown={handleKeyPress} // 키 눌릴 때 호출
			/>
			</div>
			<Link to={myPageUrl}>
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
};

export default MainHeader;
