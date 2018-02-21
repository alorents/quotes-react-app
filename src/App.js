import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const fromLocalStorage = JSON.parse(localStorage.getItem('quotes'));
const quotes = fromLocalStorage || require('./quotes.json');

class App extends Component {
  getQuote() {
    var index = Math.floor(Math.random() * quotes.length);
    return quotes[index];
  }

  constructor(props) {
    super(props);
    this.state = {value: '', quote: this.getQuote()};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateQuote = this.updateQuote.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    if(!quotes.includes(this.state.value)){
      quotes.push(this.state.value);
      this.updateQuote();
    }
    this.persistQuotes();
    event.preventDefault();
  }
  
  updateQuote(event) {
    this.setState({ quote: this.getQuote()});
  }

  persistQuotes() {

    localStorage.setItem('quotes', JSON.stringify(quotes));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Hello World!</h1>
        </header>
      
        <div id='quote'>
          {this.state.quote} 
        </div> 
      
	<form id='form' onSubmit={this.handleSubmit}>
	  <label>
	    Quote:
	    <input type="text" value={this.state.value} onChange={this.handleChange} />
	  </label>
	  <input type="submit" value="Submit" />
	</form>

	  <button onClick={this.updateQuote} >Get new quote</button>
      </div>
    );
  }
}

export default App;
