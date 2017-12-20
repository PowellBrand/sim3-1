import React from "react";

import './User.css';

export default function User({ person_id, user_id, first, last, picture, friended, add, remove }) {
  return (
    <div className="Search__user_container content-container">
      <img className="Search__user_img" src={ picture } alt="profile" />

      <div className="Search__user_name_container">
        <span className="open-sans-bold">{ first }</span>
        <span className="open-sans-bold">{ last }</span>
      </div>

      <div className="Search__user_btn_container">
        {
          friended
          ?
            <button className="Search__user_btn black-btn" onClick={ () => remove( user_id, person_id ) }> Remove Friend </button>
          :
            <button className="Search__user_btn orange-btn" onClick={ () => add( user_id, person_id) }> Add Friend </button>
        }
      </div>
    </div>
  )
}