import React from 'react'
//import PropTypes from 'prop-types'

const error = {
    color: 'red',
    background: 'lightgrey',
    font_size: 20,
    border_style: 'solid',
    border_radius: 5,
    padding: 10,
    margin_bottom: 10
  }

const success = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom : 10
  }

const Notification = ({ errorMessage, successMessage }) => {
    if (successMessage === null && errorMessage === null) {
        return null
    } else if (successMessage){
        return (
            <div id='succes' style={success}>
                {successMessage}
            </div>
        )

    }
}

/*Notification.propTypes = {
    errorMessage: PropTypes.string,
    successMessage: PropTypes.string
  }*/
  
  export default Notification