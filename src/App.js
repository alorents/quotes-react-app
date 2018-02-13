import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const fromLocalStorage = JSON.parse(localStorage.getItem('quotes'));
const quotes = fromLocalStorage || require('./quotes.json');

class App extends Component {
  getQuote() {
    //return quotes;
    var index = Math.floor(Math.random() * quotes.length);
    console.log('getQuote' )
    console.log(quotes )
    console.log(index )
    console.log(quotes[index])
    return quotes[index];
  }
  constructor(props) {
    super(props);
    this.state = {value: '', quote: this.getQuote()};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    if(!quotes.includes(this.state.value)){
      quotes.push(this.state.value);
      this.setState({ quote: this.getQuote()});

      console.log(this.state.quote )
    }
    this.persistQuotes();
    event.preventDefault();
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

      </div>
    );
  }
}

export default App;
