import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

function BookDetail() {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<BookDetailType | null>(null);
  const loggedInUsername=localStorage.getItem('name');

  const url = "https://ifrbzeaz2b.execute-api.ap-northeast-1.amazonaws.com";
  const token = localStorage.getItem("token");

  const fetchBookDetail = async () => {
    try {
      const response = await axios.get(`${url}/books/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        setBook(response.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBookDetail();
  }, [id]);

  

  return book ? (
    <div className="book-detail-container">
      <h1>書籍レビューの詳細画面</h1>
      <table>
        <tbody>
          <tr>
            <td>書籍タイトル：</td>
            <td>{book.title}</td>
          </tr>
          <tr>
            <td>URL:</td>
            <td>
            {book.url}
            </td>
          </tr>
          <tr>
            <td>詳細:</td>
            <td>{book.detail}</td>
          </tr>
          <tr>
            <td>レビュー：</td>
            <td>{book.review}</td>
          </tr>
          <tr>
            <td>レビュワー：</td>
            <td>{book.reviewer}</td>
          </tr>
        </tbody>
      </table>
      {book.reviewer===loggedInUsername && <Link to={`/edit/${id}`}>投稿編集</Link>}
    </div>
  ) : (
    <div className="loading custom-loader">
    <ClipLoader
      color="red"
      size={50}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  </div>
  );
}

export default BookDetail;
