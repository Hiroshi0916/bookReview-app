import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Login from "./Login";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./Register";
import NavigationBar from "./Navbar";
import Home from "./Home";
import { AuthProvider } from "./AuthContext";
import Profile from "./Profile";
import NewReview from "./NewReview";
import BookDetail from "./BookDetail";
import EditBook from "./EditBook";


const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("root element not found");
}
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <AuthProvider>
      <Router>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/new" element={<NewReview />}/>
          <Route path="/detail/:id" element={<BookDetail/>} />
          <Route path="/edit/:id" element={<EditBook/>}/>
        </Routes>
      </Router>
    </AuthProvider>
  </React.StrictMode>
);

reportWebVitals();
