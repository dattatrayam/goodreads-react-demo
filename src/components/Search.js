import React from "react";
import PropTypes from "prop-types";
import Axios from "axios";
import BookResultList from "./BookResultList";

const goodReadApiKey = '1QuOnDaZDKNfSKf09AjA';

class Search extends React.Component {
	
	constructor(props) {
    super(props);
    this.state = {
      searchText:'',
      error: '',
	  fetching:false
    };
	this.onSearchTextChange = this.onSearchTextChange.bind(this);
	this.onSearchButtonClick = this.onSearchButtonClick.bind(this);
	this.parseXMLResponse = this.parseXMLResponse.bind(this);
  }
	onSearchTextChange(e) {
		this.setState({ searchText: e.target.value });
	}
	
	onSearchButtonClick(e) {
		this.setState({ fetching: true });
		 const requestUri =
		  `https://cors-anywhere.herokuapp.com/` +
		  `https://www.goodreads.com/search/index.xml?key=${goodReadApiKey}&q=${this.state.searchText}`;

		Axios.get(requestUri)
		  .then(res => {
			this.parseXMLResponse(res.data);
		  })
		  .catch(error => {
			this.setState({
			  error: error.toString(),
			  fetching: false
			});
		  });
	}
	
	 // parse string xml received from goodreads api
	 parseXMLResponse (response) {
    const parser = new DOMParser();
    const XMLResponse = parser.parseFromString(response, "application/xml");
    const parseError = XMLResponse.getElementsByTagName("parsererror");

    if (parseError.length) {
      this.setState({
        error: "There was an error fetching results.",
        fetching: false
      });
    } else {
      const XMLresults = new Array(...XMLResponse.getElementsByTagName("work"));
      const searchResults = XMLresults.map(result => this.XMLToJson(result));
      this.setState({ fetching: false }, () => {
        this.props.setResults(searchResults);
      });
    }
	};
	
	XMLToJson(XML) {
		const allNodes = new Array(...XML.children);
		const jsonResult = {};
		allNodes.forEach(node => {
		  if (node.children.length) {
			jsonResult[node.nodeName] = this.XMLToJson(node);
		  } else {
			jsonResult[node.nodeName] = node.innerHTML;
		  }
		});
		return jsonResult;
	}
	
	render() {
		return(
			<div>
			 <div className="form-group row">
			  <input
				className="mr-1 col-sm-9 form-control"
				type="text"
				placeholder="Search Books"
				name="searchText"
				onChange={ this.onSearchTextChange }
				value={this.state.searchText}
			  />
			  <button
				 className="col-sm-2 btn btn-primary"
				onClick={ this.onSearchButtonClick}
			  >
				Search
			  </button>
			 </div>
			
		
         {this.state.fetching ? (
          <p className="lead text-center">{"loading... "}</p>
        ) : (
          (this.state.error && (
            <p className="text-danger">{this.state.error}</p>
          )) || (
			<BookResultList
              books={this.props.results}
              detailBook={this.props.detailBook}
            />
          )
        )}
		  </div>
		);
	}
	
}

export default Search;