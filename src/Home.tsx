import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";
import { Book } from "./interfaces/Book";
import { AuthContext } from "./AuthContext";
import { Link } from "react-router-dom";
import BooksTable from "./BooksTable";

function Home() {
  const [books, setBooks] = useState<Book[]>([]);
  const [offset, setOffset] = useState(0);

  const authContext = useContext(AuthContext);

  // Define base URL
  const url = "https://ifrbzeaz2b.execute-api.ap-northeast-1.amazonaws.com";

  const fetchBooks = async () => {
    const endPoint = authContext?.isAuthenticated ? "/books" : "/public/books";
    const fullUrl = `${url}${endPoint}?offset=${offset}`;
    const headers = authContext?.isAuthenticated
      ? { Authorization: `Bearer ${localStorage.getItem("token")}` }
      : {};

    try {
      const response = await axios.get(fullUrl, { headers });

      if (response.status === 200) {
        setBooks(response.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [offset]);

  const handleNext = () => {
    setOffset((prevOffset) => prevOffset + 10);
  };
  const handlePrevious = () => {
    if(offset>=10){
      setOffset((prevOffset) => prevOffset - 10);
    }
  };

  const sendLog = async(selectBookId:string)=>{
    try{
      const response = await axios.post(
        `${url}/logs`,
        {selectBookId},
        {
          headers:{
            Authorization:`Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if(response.status !== 200){
        console.log("Failed to send log");
      }
    }catch (err){
      console.log(err);
    }
  };

  return (
    <div className="book-list">
      <BooksTable books={books} onBookLinkClick={sendLog}/>
      <div className="book-list__next-button-container">
        <button className="book-list__prev-button" onClick={handlePrevious} disabled={offset === 0}>
          前へ
        </button>
        <button className="book-list__next-button" onClick={handleNext}>
          次へ
        </button>
      </div>
    </div>
  );
}

export default Home;
