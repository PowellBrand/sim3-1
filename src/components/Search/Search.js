import React, { Component } from "react";
import { connect } from "react-redux";
import { logout, getPeople, authenticated, searchPeople, getFriends, addFriend, removeFriend } from '../../ducks/reducer';

import User from './User/User';
import Pagination from './Pagination/Pagination';
import Header from '../Header/Header';

import auth from '../../utils/Auth';

import './Search.css';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      searchBy: 'first',
      name: '',
      people: [],
      pages: [],
      friends: []
    };

    this.updateState = this.updateState.bind( this );
    this.search = this.search.bind( this );
    this.reset = this.reset.bind( this );
  }

  componentWillMount() {
    const {  authenticated, user, history, getPeople, getFriends, match } = this.props;

    auth( 
      authenticated, 
      user, 
      history, 
      null, 
      null, 
      [ { fn: getPeople, params: [ user ? user.id : null, match.params.page ] }, 
        { fn: getFriends, params: [ user ? user.id : null ] } ] 
    );
  }

  componentWillReceiveProps( nextProps ) {
    const { getPeople, match, getFriends } = this.props;

    if ( nextProps.user !== null && this.props.user === null ) {
      getPeople( nextProps.user.id, match.params.page );
      getFriends( nextProps.user.id );
    } else if ( nextProps.user !== null && this.props.user !== null ) {
      if ( match.params.page !== nextProps.match.params.page ) {
        getPeople( nextProps.user.id, nextProps.match.params.page );
      }

      this.setState({ people: nextProps.people, pages: nextProps.pages, friends: nextProps.friends });
    }
  }

  updateState( prop, val ) {
    this.setState({ [prop]: val });
  }

  search() {
    const { searchPeople } = this.props;
    const { searchBy, name } = this.state;

    searchPeople( searchBy, name );
  }

  reset() {
    const { getPeople, match, user } = this.props;
    this.setState({ searchBy: 'first', name: '' });
    getPeople( user.id, match.params.page );
  }

  render() {
    const { friends } = this.state;
    const { logout, history, addFriend, removeFriend, user, match } = this.props;

    const UserComponents = this.state.people.map( person => (
      <User key={ person.id } 
            person_id={ person.id } 
            user_id={ user.id }
            picture={ person.picture } 
            first={ person.first } 
            last={ person.last } 
            friended={ friends.indexOf(person.id) !== -1 ? true : false }
            add={ addFriend }
            remove={ removeFriend } />
    ));

    const PaginationComponents = this.state.pages.map( page => (
      <Pagination key={ page } page={ page } current={ page === match.params.page ? true : false } />
    ));

    return (
      <div className="Search__container">
        <Header page="Search" logout={ logout } history={ history } />

        <div className="Search__parent">
          <div className="Search__child content-container">
            <div className="Search__child_top">
              <select className="Search__option_select open-sans" value={ this.state.searchBy } onChange={ ( e ) => this.updateState( 'searchBy', e.target.value ) }>
                <option value="first"> First Name </option>
                <option value="last"> Last Name </option>
              </select>

              <input className="Search__input open-sans" value={ this.state.name } onChange={ ( e ) => this.updateState( 'name', e.target.value ) } />
              <button className="Search__btn black-btn open-sans" onClick={ this.search }> Search </button>
              <button className="Search__btn grey-btn open-sans" onClick={ this.reset }> Reset </button>
            </div>

            <div className="Search__child_bottom">
              <div id="Search__users_container">
                {
                  UserComponents
                }
              </div>
              <div className="Search__pagination_parent">
                <div className="Search__pagination_child">
                  {
                    PaginationComponents
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

export default connect( state => state, { logout, getPeople, authenticated, searchPeople, getFriends, addFriend, removeFriend } )( Search );