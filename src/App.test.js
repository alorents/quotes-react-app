import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {shallow} from 'enzyme';
import {configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

const quotes = require('./quotes.json');
const app = shallow(<App/>);

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('says hello world', () => {
  expect(app.find('h1').text()).toEqual('Hello World!');
});

it('has a list of quotes', () => {
  expect(app.find('#quote').exists()).toEqual(true);
});

it('expext quotes to have foo', () => {
  expect(quotes[0]).toEqual('foo');
});

it('displays quote', () => {
  const quote = app.find('#quote').text()
  expect(quotes.indexOf(quote)>-1).toEqual(true);
});

it('updates quotes list', () => {
  const form = app.find('#form')
  app.setState({value: 'test'});
  app.simulate('submit');
  expect(quotes[quotes.length-1]).toEqual('test');
});
