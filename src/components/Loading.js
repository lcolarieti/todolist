import React, { Component } from 'react';
import {connect} from 'react-redux';
import '../app.scss';

const mapStateToProps = state => {

  return {
    fetching: state.fetching
  };
};

class Loading extends Component {

  render() {
    const show = this.props.fetching;
    let style = {display: show ? 'block' : 'none'};
    return (
      <div id="loading" style={style}>
        <div className="boxes">
            <div className="box">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div className="box">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div className="box">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div className="box">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
          </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, null)(Loading);
