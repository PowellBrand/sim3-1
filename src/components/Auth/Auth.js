import React, { Component } from "react";
import { authenticated } from '../../ducks/reducer';
import { connect } from "react-redux";

import api from "../../api";
import auth from '../../utils/Auth';

import './Auth.css';
import logo from '../../assets/logo.png';

class Login extends Component {
  componentWillMount() {
    const { authenticated, user, history } = this.props;
    auth( authenticated, user, history, '/', '/', null );
  }

  render() {
    let url;

    if ( process.env.NODE_ENV === "development" ) {
      url = `${ window.location.protocol }//${ window.location.hostname }:${ api.port }${ api.login }`;
    } else {
      url = `${ window.location.origin }${ api.login }`;
    }

    console.log( this.props.user );

    return (
      <div className="Auth__parent_container pink-to-green-gradient">
        <div className="Auth__child_container orange-to-yellow-gradient">
          <div className="Auth__logo_container">
            <img className="Auth__logo_img" src={ logo } alt="logo" />
            <div className="Auth__logo_text open-sans-bold">Helo</div>
          </div>

          <div className="Auth__link_container">
            <div className="Auth__auth0_div open-sans black-bgc">
              <a className="Auth__auth0_link open-sans" href={ `${ url }` }>Login / Register</a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect( state => state, { authenticated } )( Login );
