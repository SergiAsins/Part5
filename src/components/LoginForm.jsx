import React, { useState } from 'react'
//import PropTypes from 'prop-types'

//gh: const LoginForm = (props) => {
  const LoginForm = ( handleLogin ) => {
    const [username, setUsername] = useState('') // useState para manejar el estado
    const [password, setPassword] = useState('')

    const handleSubmit = (credentials) => {
      handleLogin({
        username,
        password
      })
      setUsername('')
      setPassword('')
    }

    return (
      <form onSubmit={handleSubmit}>
        <div>
          username <input id='username' type="text" value={username} name="Username" onChange={({ target }) => setUsername(target.value)}/>
        </div>
        <div>
          password <input id='password' type="password" value={password} name="Password" onChange={({ target }) => setPassword(target.value)}/>
        </div>
        <button id='login-button' type="submit">login</button>
      </form>
    )}

    /*LoginForm.propTypes = {
        handleLogin: PropTypes.func.isRequired,
      }*/
      
      export default LoginForm