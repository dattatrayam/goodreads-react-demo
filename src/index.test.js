import React from 'react'
import BookSearchApp from "./components/BookSearchApp";
import Search from "./components/Search";
import BookResultList from "./components/BookResultList";
import BookDetailInfo from "./components/BookDetailInfo";
import BookDashCard from "./components/BookDashCard";
import {shallow} from 'enzyme'

it('renders without crashing', () => {
  shallow(<BookSearchApp />);
});

it('renders without crashing', () => {
  shallow(<Search />);
});

it("when search input changed", () => {
    const componentWrapper = shallow(<Search />);
    componentWrapper.find('#searchText').simulate('change', {target: {value: 'Testing'}});
    expect(componentWrapper.state('searchText')).toEqual('Testing');
 
});

it("when search button clicked", () => {
    const componentWrapper = shallow(<Search />);
    componentWrapper.find('#searchText').simulate('change', {target: {value: 'Testing'}});
	componentWrapper.find('#searchBtn').simulate('click');
    expect(componentWrapper.state('fetching')).toEqual(true);
 
});

