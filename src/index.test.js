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


it('renders without crashing', () => {
  shallow(<BookResultList />);
});

it('renders without crashing', () => {
  shallow(<BookDetailInfo />);
});
it('renders without crashing', () => {
  shallow(<BookDashCard />);
});


it('Search component renders BookResultList component', () => {
  let results = Array(10).fill(null)
   const wrapper = shallow(<Search results={results}/>);
   expect(wrapper.find(BookResultList)).to.have.lengthOf(1);
});



it('BookResultList component renders ten BookDashCard components', () => {
  let books = Array(10).fill(null)
  const wrapper = shallow(<BookResultList books={books}/>);
  expect(wrapper.find(BookDashCard)).to.have.lengthOf(10);
});