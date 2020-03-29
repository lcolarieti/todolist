import React from 'react';
import List from './List';
import ListTodos from './ListTodos';
import Loading from './Loading';
import Header from './Header';
import Footer from './Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTasks } from '@fortawesome/free-solid-svg-icons';
import {connect} from 'react-redux';
import './../app.scss';

const mapStateToProps = state => {

  return {
    todosListId: state.todosListId,
    todosView: state.todosView
  };
};

class App extends React.Component {

  render() {
      return (
        <>
          <Header />
          {!this.props.todosView ? <List /> : <ListTodos />}
          <Loading />
          <FontAwesomeIcon className="background-icon" icon={faTasks} />
          <Footer />
        </>
      );
  }

}

export default connect(mapStateToProps, null)(App);
