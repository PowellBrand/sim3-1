import React, { Component } from "react";
import { connect } from "react-redux";
import { authenticated, patchUser, logout } from '../../ducks/reducer';

import GPDD from '../../utils/GenerateProfileDropDowns';
import auth from '../../utils/Auth';

import Header from '../Header/Header';
import Error from './Error/Error';

import './Profile.css';

class Profile extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      id: "",
      first: "",
      last: "",
      birthday: "",
      e_color: "",
      h_color: "",
      gender: "",
      hobby: "",
      b_month: "",
      b_day:  "", 
      b_year: "",
      showRequired: false
    };

    this.updateProfile = this.updateProfile.bind( this );
    this.cancel = this.cancel.bind( this );
    this.updateState = this.updateState.bind( this );
    this.formatPropsToState = this.formatPropsToState.bind( this );
  }

  componentWillMount() {
    const { user, history, authenticated } = this.props;
    auth( authenticated, user, history, null, null, null );
    this.formatPropsToState( user );
  }

  formatPropsToState( user ) {
    if ( user !== null ) {
      for( var i in user ) {
        this.setState({ [i]: user[i] || "" });
      }

      if ( user.birthday ) {
        this.setState({ b_month: user.birthday.slice(5, 7) || "", 
                        b_day: user.birthday.slice(8, 10) || "", 
                        b_year: user.birthday.slice(0, 4) || ""
        });
      }
    }
  }
  
  componentWillReceiveProps( { user } ) {
    this.formatPropsToState( user );
  }

  updateProfile() {
    const { patchUser } = this.props;
    const { id, first, last, birthday, e_color, h_color, gender, hobby } = this.state;

    if ( !birthday ) {
      this.setState({ showRequired: true });
    } else {
      this.setState({ showRequired: false });
      patchUser({ id, first, last, birthday, e_color, h_color, gender, hobby });
    }
  }

  cancel() {
    const { user } = this.props;
    this.formatPropsToState( user );
  }

  updateState( prop, val ) {
    this.setState({ [prop]: val });

    if ( prop === "b_month" || prop === "b_day" || prop === "b_year" ) {
      const { b_month, b_day, b_year } = this.state;
      let temp = { b_month, b_day, b_year };
      temp[ prop ] = val;

      this.setState({ birthday: [ temp.b_year, temp.b_month, temp.b_day ].join('-') });
    }
  }

  render() {
    const months = GPDD.months;
    const days = GPDD.days;
    const years = GPDD.years;
    const { history, user, logout } = this.props;
    const { showRequired } = this.state;

    return (
      <div style={{ minHeight: '100vh' }}>
        <Header page="Profile" logout={ logout } history={ history } />

        <div className="Profile__parent">
          <div className="Profile__child">
            <div className="Profile__user_container content-container">
              <img className="Profile__img" src={ this.state.picture } alt="user" />
              <div className="Profile__name_container">
                <span className="Profile__name_span open-sans-bold">{ user ? user.first : '' }</span>
                <br />
                <span className="Profile__name_span open-sans-bold">{ user ? user.last : '' }</span>
              </div>

              <div className="Profile__btn_container">
                <button className="Profile__btn black-btn" onClick={ this.updateProfile }> Update </button>
                <button className="Profile__btn grey-btn" onClick={ this.cancel }> Cancel </button>
              </div>
            </div>

            <div className="Profile__user_edit content-container">
              <div className="Profile__user_edit_child">
                <div className="Profile__user_edit_left">
                  <div className="Profile__user_input_container">
                    <span className="Profile__user_input_header open-sans">First Name</span>
                    <input className="Profile__user_input open-sans" value={ this.state.first } onChange={ ( e ) => this.updateState( 'first', e.target.value ) } />
                  </div>

                  <div className="Profile__user_input_container">
                    <span className="Profile__user_input_header open-sans">Last Name</span>
                    <input className="Profile__user_input open-sans" value={ this.state.last } onChange={ ( e ) => this.updateState( 'last', e.target.value ) } />
                  </div>

                  <div className="Profile__user_input_container">
                    <span className="Profile__user_input_header open-sans">Gender</span>
                    <select className="Profile__user_select open-sans" value={ this.state.gender } onChange={ ( e ) => this.updateState( 'gender', e.target.value ) } >
                      <option disabled value=""> -- Select -- </option>
                      <option value="Male"> Male </option>
                      <option value="Female"> Female </option>
                    </select>
                  </div>

                  <div className="Profile__user_input_container">
                    <span className="Profile__user_input_header open-sans">Hair Color</span>
                    <select className="Profile__user_select open-sans" value={ this.state.h_color } onChange={ ( e ) => this.updateState( 'h_color', e.target.value ) } >
                      <option disabled value=""> -- Select -- </option>
                      <option value="Brown"> Brown </option>
                      <option value="Red"> Blue </option>
                      <option value="Green"> Green </option>
                      <option value="Red"> Red </option>
                      <option value="Blonde"> Blonde </option>
                      <option value="White"> White </option>
                    </select>
                  </div>

                  <div className="Profile__user_input_container">
                   <span className="Profile__user_input_header open-sans">Eye Color</span>
                    <select className="Profile__user_select open-sans" value={ this.state.e_color } onChange={ ( e ) => this.updateState( 'e_color', e.target.value ) } >
                      <option disabled value=""> -- Select -- </option>
                      <option value="Brown"> Brown </option>
                      <option value="Blue"> Blue </option>
                      <option value="Green"> Green </option>
                    </select>
                  </div>
                </div>

                <div className="Profile__user_edit_right">
                  <div className="Profile__user_input_container">
                    <span className="Profile__user_input_header open-sans">Hobby</span>
                    <select className="Profile__user_select open-sans" value={ this.state.hobby } onChange={ ( e ) => this.updateState( 'hobby', e.target.value ) } >
                      <option disabled value=""> -- Select -- </option>
                      <option value="Hobby #1"> Video Games </option>
                      <option value="Hobby #2"> Hiking </option>
                      <option value="Hobby #3"> Fishing </option>
                      <option value="Hobby #4"> Rafting </option>
                    </select>
                  </div>

                  <div className="Profile__user_input_container">
                    <span className="Profile__user_input_header open-sans">Birthday Day</span>
                    <select className="Profile__user_select open-sans" value={ this.state.b_day } onChange={ ( e ) => this.updateState( 'b_day', e.target.value ) } >
                      <option value=""> -- Select -- </option>
                      {
                        days.map( day => (
                          <option key={ day } value={ day }> { day } </option>
                        ))
                      }
                    </select> 
                  </div>

                  <div className="Profile__user_input_container">
                    <span className="Profile__user_input_header open-sans">Birthday Month</span>
                    <select className="Profile__user_select open-sans" value={ this.state.b_month } onChange={ ( e ) => this.updateState( 'b_month', e.target.value ) } >
                      <option disabled value=""> -- Select -- </option>
                      {
                        months.map( month => (
                            <option key={ month.value } value={ month.value }> { month.label } </option>
                        ))
                      }
                    </select>
                  </div>

                  <div className="Profile__user_input_container">
                    <span className="Profile__user_input_header open-sans">Birthday Year</span>
                    <select className="Profile__user_select open-sans" value={ this.state.b_year } onChange={ ( e ) => this.updateState( 'b_year', e.target.value ) } >
                      <option value=""> -- Select -- </option>
                      {
                        years.map( year => (
                          <option key={ year } value={ year }> { year } </option>
                        ))
                      }
                    </select>
                  </div>
                </div>
              </div>
                {
                  showRequired
                  ?
                    <Error />
                  :
                    null
                }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect( state => state, { authenticated, patchUser, logout } )( Profile );