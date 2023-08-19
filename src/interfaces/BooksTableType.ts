import { Book } from "./Book";

export interface Props{
    books:Book[];
    onBookLinkClick:(bookId:string)=>void;
}
