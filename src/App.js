import React, { Component } from 'react';
import './App.css';
import Card from './components/Card/Card';
import Wrapper from "./components/Wrapper";
import doctors from "./doctors.json";

const catchphrases = [
  "Brilliant!",
  "Allons y!",
  "Geronimo!",
  "Fantastic!",
  "Well done!",
  "Oh yes!",
  "Jolly good!",
  "Would you care for a Jelly Baby?",
  "NO MORE."
];

class App extends Component {

  state = {
    doctors,
    clicked: [],
    score: 0,
    topScore: 0,
    dialog: ""
  };

  imShufflin = (array) => {
    for (let i = 0; i < array.length; i++) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  clicky = id => {
    const shuffledArr = this.imShufflin(doctors);
    this.setState({ doctors: shuffledArr });

    if (this.state.clicked.includes(id)) {
      this.setState({
        score: 0,
        clicked: [],
        dialog: "Oh bollocks! You've clicked that one! Regenerate and try again."
      })
    } else {
      this.setState({
        clicked: this.state.clicked.concat([id]),
        score: this.state.score + 1,
        dialog: catchphrases[Math.floor(Math.random() * (catchphrases.length + 1))]
      });
    }

    if (this.state.score > this.state.topScore) {
      this.setState({ topScore: this.state.score });
    }

    if (this.state.score === 15) {
      this.setState({
        dialog: "Well then. That's this Time Lord sorted. Thank you!"
      })
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Doctor Who Memory</h1>
          <p className="App-intro">
            The Doctor and his TARDIS are lost in the Time Vortex!<br></br>          
            Click on each of his regenerations (and the TARDIS) to help sort him out,<br></br>
            but don't click on any more than once, or you'll have to regenerate!
          </p>
          <p className="score">SCORE: {this.state.score} TOP SCORE: {this.state.topScore}</p>
          <p className="dialog">{this.state.dialog}</p>
        </header>
        <Wrapper
          pics={this.state.doctors.map(pic => (
            <Card
              clicky={this.clicky}
              id={pic.id}
              key={pic.id}
              name={pic.name}
              image={pic.source}
            />
          ))}
        />
      </div>
    );
  }
}



export default App;
