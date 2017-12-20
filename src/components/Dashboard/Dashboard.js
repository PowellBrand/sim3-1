import React, { Component } from "react";
import { connect } from "react-redux";
import { logout, authenticated, getRecommended, addRecommended } from "../../ducks/reducer";

import User from './User/User';
import Recommended from './Recommended/Recommended';
import Header from '../Header/Header';

import './Dashboard.css';

import auth from '../../utils/Auth';

class Dashboard extends Component {
  componentWillMount() {
    const { user, history, authenticated } = this.props;
    auth( authenticated, user, history, null, null, null );
  }

  componentWillReceiveProps( nextProps ) {
    const { history, getRecommended } = this.props;
    if ( nextProps.user === null && this.props.user !== null ) {
      history.push('/auth');
    }
    if ( nextProps.user !== null && this.props.user === null ) {
      getRecommended( nextProps.user, this.state.filter );
    }
  }

  constructor() {
    super();
    this.state = {
      filter: 'first'
    };

    this.updateFilter = this.updateFilter.bind( this );
  }

  updateFilter( filter ) {
    this.setState({ filter });
    const { user, getRecommended } = this.props;

    getRecommended( user, filter );
  }

  render() {
    const { logout, history, user, addRecommended } = this.props;
    const { filter } = this.state; 

    return (
      <div style={{ height: 'auto' }}>
        <Header page="Dashboard" logout={ logout } history={ history } />
        <div className="Dashboard__parent_container">
          <div className="Dashboard__child_container">
            <div className="Dashboard__child_top">
              <User user={ user } />

              <div className="Dashboard__onboarding content-container">
                <span className="open-sans">Welcome to Helo! Find recommended friends based on your similarities, and even search for them by name. The more you update your profile, the better recommendations we can make!</span>
              </div>
            </div>

            <div className="Dashboard__recommended_parent">
              <div className="Dashboard__recommended_child content-container">
                <div className="Dashboard__recommended_header">
                  <span className="Dashboard__recommended_header_span open-sans"> Recommended Friends </span>
                  <span className="Dashboard__recommended_select_span open-sans"> Sorted by </span>
                  <select className="Dashboard__recommended_select open-sans" value={ filter } onChange={ ( e ) => this.updateFilter( e.target.value ) }>
                    <option value="first"> First Name </option>
                    <option value="last"> Last Name </option>
                    <option value="gender"> Gender </option>
                    <option value="hobby"> Hobby </option>
                    <option value="h_color"> Hair Color </option>
                    <option value="e_color"> Eye Color </option>
                    <option value="birthday"> Birthday </option>
                  </select>
                </div>

                <div className="Dashboard__recommended_users_parent">
                    {
                      this.props.recommended.length > 0 
                      ?
                        <div className="Dashboard__recommended_users_child">
                        {
                            this.props.recommended.map( user => (
                              <Recommended key={ user.id } logged_in_user={ this.props.user } recommended_user={ user } add={ addRecommended } filter={ filter } />
                            ))
                        }
                        </div>
                      :
                        <div className="Dashboard__recommended_users_child_empty">
                          <span className="open-sans"> No recommendations </span>
                        </div>
                    }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect( state => state, { logout, authenticated, getRecommended, addRecommended } )( Dashboard );
