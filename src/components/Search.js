import React from "react";
import PropTypes from "prop-types";
import BookResultList from "./BookResultList";

const goodReadApiKey = '1QuOnDaZDKNfSKf09AjA';
let fileReader;

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
		//this.getResponseFromFile();
		const requestUri =
      `https://cors-anywhere.herokuapp.com/` +
      `https://www.goodreads.com/search/index.xml?key=${goodReadApiKey}&q=${this.state.searchText}`;
	    fetch(requestUri)
		.then(
			(result) => {
			  this.setState({fetching: false});
			  this.parseXMLResponse(result);
			  //this.getResponseFromFile();
			},
			(error) => {
			  this.setState({fetching: false,error:error});
			}
		)
	}
	
	 // parse string xml received from goodreads api
	 parseXMLResponse(response) {
		 //console.log("parseXMLResponse:"+this)
		 //let response = fileReader.result
		//console.log("response:"+response);
		const parser = new DOMParser();
		const XMLResponse = parser.parseFromString(response, "application/xml");
        const XMLresults = new Array(...XMLResponse.getElementsByTagName("work"));
		//console.log("XMLresults:"+XMLresults[0]);
		const searchResults = XMLresults.map(result => this.XMLToJson(result));
		this.setState({ fetching: false }, () => {
			this.props.setResults(searchResults);
		  });
	 }
	getResponseFromFile(file) {
		console.log("file response");
		fileReader = new FileReader()
		fileReader.onloadend = this.parseXMLResponse;
		fileReader.readAsText(file);
	}
	
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
			  <input type="file" onChange={ e => this.getResponseFromFile(e.target.files[0])} />
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

Search.propTypes = {
  results: PropTypes.array,
  setResults: PropTypes.func,
};

export default Search;