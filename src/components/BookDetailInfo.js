import React from "react";

function BookDetailInfo(props) {
 return (
      <div className="row col-lg-12">
        <button className="btn btn-primary" onClick={props.onBackClick}>
          {"<< Back"}
        </button>

        <h3 className="col-lg-12 mb-3 mt-3">{props.bookData.best_book.title}</h3>
        <div className="col-lg-2 col-sm-4 ">
          <img
            src={props.bookData.best_book.image_url}
            height="200px"
            width="130px"
            alt="book cover"
          />
          <p>
            By:{" "}
            <span className="font-weight-bold">
              {props.bookData.best_book.author.name}
            </span>
          </p>
          <p>Avg. Rating: {props.bookData.average_rating}</p>
        </div>
      </div>
    );
}


export default BookDetailInfo;