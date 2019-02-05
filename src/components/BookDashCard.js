import React from "react";

function BookDashCard(props) {
 return (
    <div className="col-lg-2 col-sm-4 col-md-3">
      <div className="card">
        <img
          className="card-img-top pl-2 pr-2 pt-2"
          src={props.bookData.best_book.image_url}
          alt="Book cover"
          height="200px"
        />
        <div className="card-body">
          <p
            className="text-sm-left card-title font-weight-bold"
            data-toggle="tooltip"
            data-placement="bottom"
            title={props.bookData.best_book.title}
          >
            {props.bookData.best_book.title}
          </p>
          <p className="text-sm-left card-text">
            {props.bookData.best_book.author.name}
          </p>

          <button
            className="btn btn-primary"
            onClick={() => props.detailBook(props.bookData)}
          >
            Detail Info
          </button>
        </div>
      </div>
    </div>
  );
}


export default BookDashCard;