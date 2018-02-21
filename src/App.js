import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const fromLocalStorage = JSON.parse(localStorage.getItem('quotes'));
const QUOTES = fromLocalStorage || require('./quotes.json');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '', 
      quotes: QUOTES,
      quote: this.getQuote(QUOTES) 
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.removeQuote = this.removeQuote.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    if(!this.state.quotes.includes(this.state.value)){
      const newQuotes = this.state.quotes.concat(this.state.value);

      this.setState({ 
	quotes: newQuotes,  
	quote: this.getQuote(newQuotes)
      });
      this.persistQuotes(newQuotes);
    }
    event.preventDefault();
  }
  
  removeQuote(event, index) {
    const newQuotes = this.state.quotes.filter((x,i) => i !== index );
    this.setState({ 
      quotes: newQuotes,  
      quote: this.getQuote(newQuotes)
    });
    this.persistQuotes(newQuotes);
  }

  getQuote(quotes) {
    var index = Math.floor(Math.random() * quotes.length);
    return quotes[index];
  }

  persistQuotes(newQuotes) {
    localStorage.setItem('quotes', JSON.stringify(newQuotes));
  }

  listQuotes() {
    return this.state.quotes.map((quote, index) => 
      <li key={'quote'+index}>{quote}
	<button key={'quote_button'+index} onClick={(event) => this.removeQuote(event, index)}>Remove</button>
      </li>
    );
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

      <ul>{this.listQuotes()}</ul>
      </div>
    );
  }

}

export default App;
