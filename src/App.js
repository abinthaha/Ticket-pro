import React from 'react';
import './App.css';

class App extends React.Component {

  componentDidMount() {
    this.props.history.push('/login')
  }

  render() {
    return (
      <div className="App"></div>
    );
  }
}

export default App;
