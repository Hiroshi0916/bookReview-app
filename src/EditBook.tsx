import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditBook() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [book, setBook] = useState<BookDetailType | null>(null);
  const token = localStorage.getItem("token");
  const baseurl = "https://ifrbzeaz2b.execute-api.ap-northeast-1.amazonaws.com";

  useEffect(() => {
    const fetchBookDetail = async () => {
      try {
        const response = await axios.get(`${baseurl}/books/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.status === 200) {
          setBook(response.data);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchBookDetail();
  }, [id, baseurl, token]);

  const handleDelete = async () => {
    try{
      const response = await axios.delete(`${baseurl}/books/${id}`, {
          headers:{Authorization:`Bearer ${token}`},
      });
      if(response.status ===200){
          navigate(`/`);
      }
    }
    catch(err){
      console.error(err);
    }
  };

  const handleEditComplete = async() => {
    try{
        if(book){
            const {title,url,detail,review}=book;
            console.log("check token: "+token);
            console.log("url check: "+url+" id: "+id);

              
            const response = await axios.put(`${baseurl}/books/${id}`,
            {title,url,detail,review},
            {
                headers:{Authorization:`Bearer ${token}`},
            }
            );
            if(response.status ===200){
                navigate(`/detail/${id}`);
            }
        }
    }catch(err){
        console.error(err);
    }
  };

  return (
    <div className="edit-container">
      <h1>書籍レビューの編集画面</h1>
      {book ? (
        <table>
            <tbody>
                <tr>
                    <td>書籍タイトル:</td>
                    <td>
                        <input
                        type="text"
                        value={book.title}
                        onChange={e=>setBook({...book,title:e.target.value})}
                        />
                    </td>
                </tr>
                <tr>
                    <td>URL:</td>
                    <td>
                        <input
                         type="text"
                         value={book.url}
                         onChange={e=>setBook({...book,url:e.target.value})}
                         />
                    </td>
                </tr>
                <tr>
      <td>詳細:</td>
      <td>
        <textarea
          value={book.detail}
          onChange={e => setBook({ ...book, detail: e.target.value })}
        />
      </td>
    </tr>
    <tr>
      <td>レビュー：</td>
      <td>
        <textarea
          value={book.review}
          onChange={e => setBook({ ...book, review: e.target.value })}
        />
      </td>
    </tr>
            </tbody>
        </table>
      ):(
        <div>Loading...</div>
      )}
      
      <button onClick={handleDelete}>削除</button>
      <button onClick={handleEditComplete}>編集完了</button>
    </div>
  );
}

export default EditBook;
