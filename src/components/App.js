import React from 'react';
import List from './List';
import Loading from './Loading';
import './../app.scss';

class App extends React.Component {

  render() {
      return (
        <>
          <List />
          <Loading />
        </>
      );
  }

}

export default App;
