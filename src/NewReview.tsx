import axios, { AxiosError } from "axios";
import { useState } from "react";
import { ErrorResponse } from "./interfaces/ErrorResponse";

function NewReview() {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [detail, setDetail] = useState("");
  const [review, setReview] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const baseUrl = 'https://ifrbzeaz2b.execute-api.ap-northeast-1.amazonaws.com';
    const token = localStorage.getItem("token");
    try {
      await axios.post(
        `${baseUrl}/books`,
        { title, url, detail, review },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("書籍の投稿が成功しました!");
    } catch (err) {
        const axiosError = err as AxiosError<ErrorResponse>;
      setError(axiosError?.response?.data?.ErrorMessageEN || "エラーが発生しました");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>タイトル:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label>URL:</label>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </div>
      <div>
        <label>詳細:</label>
        <textarea value={detail} onChange={(e) => setDetail(e.target.value)} />
      </div>
      <div>
        <label>レビュー</label>
        <textarea value={review} onChange={(e)=>setReview(e.target.value)}/>
      </div>
      <div>
        <button type="submit">投稿</button>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}
export default NewReview;
