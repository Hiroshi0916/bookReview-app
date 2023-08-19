import React, { useEffect, useState } from "react";
import { Navbar, Nav } from "react-bootstrap";
import "./Navbar.css";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { AuthContextType } from "./interfaces/AuthContextType";
import { useNavigate } from "react-router-dom";

function NavigationBar() {
  const { isAuthenticated, user, logout, avatarUrl, setAvatarUrl } = useContext(AuthContext) as AuthContextType;
  const navigate = useNavigate();
  const [username, setUsername] = useState(localStorage.getItem("name"));
  // const initialName = localStorage.getItem("name");
  const[isLogged,setIsLogged]= useState(!!localStorage.getItem("token"));

  useEffect(()=>{
    setIsLogged(!!localStorage.getItem("token"));
    setUsername(localStorage.getItem("name"));
  },[isAuthenticated]);

  const handleLogout = () => {
    logout();
    localStorage.removeItem("avatarUrl");
    setAvatarUrl(null);
    localStorage.removeItem("token");
    setIsLogged(false);
    navigate('/login')
  };

  const handleLinkClick = (defaultPath: string) => {
    if (isLogged) {
      navigate("/"); // Redirect to book list if token exists
    } else {
      navigate(defaultPath); // Else, navigate to the default path
    }
  };

  return (
    <Navbar className="blue-bg" variant="dark">
      <Navbar.Brand href="/" className="title">
        書籍レビューアプリ
      </Navbar.Brand>
      <Nav className="mr-auto">
    {!isLogged &&(
            <div>
            <Nav.Link className="menu" onClick={() => handleLinkClick("/signup")}>
              Sign Up
            </Nav.Link>
          </div>
    )}
       {!isLogged &&(
            <div>
            <Nav.Link className="menu" onClick={() => handleLinkClick("/login")}>
                Log In
              </Nav.Link>
            </div>
       )}
        {isAuthenticated && (
          <>
              <Nav.Link className="menu" as="div">ユーザー名：{user?.name || username}</Nav.Link>
            <div>
              <Nav.Link className="menu" href="/profile">
                ユーザー情報編集
              </Nav.Link>
            </div>
            <div>
              <Nav.Link className="menu" href="/new">
                書籍レビュー登録
              </Nav.Link>
            </div>
            <div>
              <Nav.Link className="menu" onClick={handleLogout}>
                ログアウト
              </Nav.Link>
            </div>
          </>
        )}
      </Nav>
      <nav>
        <div className="navbar-end ml-auto">
          {isAuthenticated && avatarUrl ?(
            <img src={avatarUrl} alt="user avatar" style={{ width: '200px', height: 'auto' }} />
             ) :(
              <p>NULL</p>
             )}
        </div>
      </nav>
    </Navbar>
  );
}

export default NavigationBar;
