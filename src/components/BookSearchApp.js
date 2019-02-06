import React from "react";
import Search from "./Search";
import BookDetailInfo from "./BookDetailInfo";

class BookSearchApp extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		  results: [],
		  detailBook: null
		};
		this.setResults = this.setResults.bind(this);
		this.openBookDetails = this.openBookDetails.bind(this);
	}
	
	componentDidMount(){
		document.title = "React Goodreads Book Search";
	}
	setResults(results) {
		console.log("results:"+results);
	  this.setState({ results:results });
	}
	
	onBackClick = () => {
		this.setState({
		  detailBook: null
		});
	};

	openBookDetails(detailBook) {
		this.setState({ detailBook:detailBook });
	};
	
	render() {
		return(
			<div className="container">
				<div className="container-body">
					 <div className="header">
					 <h3>Goodreads React Book Search Demo</h3>
					 <br/>
					 </div>
					 
					 <div className="bookList">
					  {this.state.detailBook ? (
						<BookDetailInfo
						  bookData={this.state.detailBook}
						  onBackClick={this.onBackClick}
						/>
						) : (
						 <Search
							results={this.state.results}
							setResults={this.setResults}
							detailBook={this.openBookDetails}
						/>
					  )}
					</div>
					 
					
					 
				</div>
			</div>
		);
	}
	
}

export default BookSearchApp;