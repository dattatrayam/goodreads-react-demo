import React from "react";
import BookDashCard from "./BookDashCard";

function BookResultList(props) {
  return (
     <div className="row">
      {props.books.map(book => (
        <BookDashCard bookData={book} key={book.id} detailBook={props.detailBook} />
      ))}
    </div>
  );
}

export default BookResultList;