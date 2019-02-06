import React from "react";
import Axios from "axios";
import StarRatings from "react-star-ratings";

const goodReadApiKey = '1QuOnDaZDKNfSKf09AjA';

class BookDetailInfo extends React.Component {
	
	constructor(props) {
		super(props);
		console.log("BookDetailInfo :"+this.props.bookData.best_book.id)
		this.state = {
		  description: "loading..",
		  error: ""
		};
		
	}
	componentDidMount() {
		console.log("componentDidMount")
		this.getDescription();
	}

	getDescription = () => {
		console.log("getDescription")
		const bookId = this.props.bookData.best_book.id;
		const requestUri =
		  `https://cors-anywhere.herokuapp.com/` +
		  `https://www.goodreads.com/book/show/${bookId}?key=${goodReadApiKey}`;
		Axios.get(requestUri)
		  .then(res => {
			const parser = new DOMParser();
			const XMLResponse = parser.parseFromString(res.data, "application/xml");

			const parseError = XMLResponse.getElementsByTagName("parsererror");

			if (parseError.length) {
			  this.setState({
				error: "There was an error fetching results."
			  });
			} else {
			  let description = XMLResponse.getElementsByTagName("description")[0].innerHTML;
			  description = description.replace("<![CDATA[", "").replace("]]>", "");
			  if (!description) {
				description = "No description found.";
			  }
			  this.setState({ description });
			}
		  })
		  .catch(error => {
			this.setState({
			  error: error.toString()
			});
		  });
	};
	render() {
	 return (
		  <div className="detailInfo">
		  <div className="row col-lg-12">
			<button className="btn btn-primary" onClick={this.props.onBackClick}>
			  {"<< Back"}
			</button>
		  </div>
		  <div className="row col-lg-12">
			<div className="col-lg-3 col-sm-8 mb-3 mt-3">
				  <img
					src={this.props.bookData.best_book.image_url}
					height="200px"
					width="200px"
					alt="cover"
				  />
			 </div>
			 <div className="col-lg-9 col-sm-8">
				<h3 className="col-lg-9 mb-3 mt-3">{this.props.bookData.best_book.title}</h3>
				 <p className="mb-3 mt-3">
					By:{" "}
					<span className="font-weight-bold">
					  {this.props.bookData.best_book.author.name}
					</span>
			   </p>
				<div className="row">
				<div className="col-md-3">
					<StarRatings
					  rating={Number(this.props.bookData.average_rating)}
					  starRatedColor="orange"
					  changeRating={this.changeRating}
					  numberOfStars={5}
					  name='rating'
					  starDimension="20px"
					  starSpacing="3px"
					/>
					<span className="font-weight-bold ml-1 mt-3">
					{this.props.bookData.average_rating}
					</span>
				 </div>
				 <div className="col-md-8">
					<span className="rating ml-1 mt-3">
					  Rating Details: {this.props.bookData.ratings_count} Ratings , {this.props.bookData.text_reviews_count} Reviews 
					</span>
				 </div>
				</div>
			  {(this.state.error && (
				<p className="text-danger">{this.state.error}</p>
			  )) || (
				<p className="mb-3 mt-3" dangerouslySetInnerHTML={{ __html: this.state.description }} />
			  )}
			</div>
		 </div>
			 
		  </div>
		);
	}
}

export default BookDetailInfo;