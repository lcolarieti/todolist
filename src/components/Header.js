import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTasks, faHome } from '@fortawesome/free-solid-svg-icons';
import {connect} from 'react-redux';
import utils from '../utils/utils';
import {goToRootAction} from '../actions/actions';

const mapStateToProps = state => {
  return {
    todosList: state.todosList,
    todosListId: state.todosListId
  };
};

function mapDispatchToProps(dispatch) {
  return {
    goToRoot: () => dispatch(goToRootAction())
  };
}

class Header extends Component {

  constructor(props) {
    super(props);

    this.state = {breadcrumbs: ''};
    this.handleClickOnRoot = this.handleClickOnRoot.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps === this.props) return;
    let listItem = utils.getListItemById(this.props.todosList, this.props.todosListId);
    listItem !== null && this.setState({breadcrumbs: listItem.name});
  }

  handleClickOnRoot() {
    this.setState({breadcrumbs: ''});
    this.props.goToRoot();
  }

  getBreadcrumbs() {
    let breadcrumbs = this.state.breadcrumbs;
    if (breadcrumbs !== '') {
      return (
        <div className="wrap">
          <ul>
            <li onClick={this.handleClickOnRoot}>
              <FontAwesomeIcon icon={faHome} />
            </li>
            <li>
              {breadcrumbs}
            </li>
          </ul>
        </div>
      )
    }
    return breadcrumbs;
  }

  render() {
    return (
      <>
        <header className={this.state.breadcrumbs !== '' ? 'shadow' : ''}>
          <div className="wrap">
            <div className="logo">
              <FontAwesomeIcon icon={faTasks} />
            </div>
            <h1>TODO List <span>by Lorenzo Colarieti</span></h1>
          </div>
        </header>
        <div className="breadcrumbs">
          {this.getBreadcrumbs()}
        </div>
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
