import React from "react";
import { Link } from "react-router-dom";
import { Props } from "./interfaces/BooksTableType";

const BooksTable:React.FC<Props> =({books,onBookLinkClick})=>{
    return(
        <div className="book-list__table-container">
            <table className="book-list__table">
                <thead className="book-list__table-head">
                    <tr>
                        <th>タイトル</th>
                        <th>リンク</th>
                        <th>詳細</th>
                        <th>レビュー</th>
                        <th>投稿者</th>
                    </tr>
                </thead>
                <tbody className="book-list__table-body">
                    {books.map((book)=>(
                        <tr key={book.id}>
                            <td>{book.title}</td>
                            <td>
                            < Link to={`/detail/${book.id}`} onClick={()=> onBookLinkClick(book.id)}>{book.title}</Link>
                            </td>
                            <td>{book.detail}</td>
                            <td>{book.review}</td>
                            <td>{book.reviewer}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
export default BooksTable;