import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification.jsx'
import LoginForm from './components/LoginForm.jsx'
import BlogForm from './components/BlogForm.jsx'
import blogService from './services/blogs.jsx'
import loginService from './services/login.jsx'

const App = () => {
  const [allBlogs, setAllBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [user, setUser] = useState(null)

  const blogFormRef = React.createRef() // refs para acceder a elementos del DOM o a componentes React 

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.Token)
      getAllBlogs()
    }
  }, [])

  const getAllBlogs = async (event) => {
    const blogs = await blogService.getAll()
    setAllBlogs(blogs)
  }

  const handleLogin = async (credentials) => { //gpt Cambia `event` por `credentials`
    //event.preventDefault() 
    try{
      const user = await loginService.login(credentials)
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      setUser(user)
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
      //setSuccessMessage('Login successful!') //gpt
      //setTimeout(() => setSuccessMessage(null), 5000) //gpt
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setSuccessMessage(null)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    blogService.setToken(null)
    setErrorMessage('Logged out successfully.')
    setTimeout(() => setErrorMessage(null), 5000)
  }

  const createBlog = async (BlogToAdd) => {
    try{
      blogFormRef.current.toggleVisibility()
      const createdBlog = await blogService
      .create(BlogToAdd)
      setSuccessMessage(
        `Blog ${BlogToAdd.tittle} was succfesully added`
      )
      setAllBlogs(allBlogs.concat(createdBlog))
      setErrorMessage(null)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch(exception) {
      setErrorMessage(
        `Cannot add blog ${BlogToAdd.title}`
      )
      setSuccessMessage(null)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    }
  }

  //const updateBlog = async (BlogToUpdate) => {}
  //const deleteBlog = async (BlogToDelete) => {}
  //const byLikes = (b1, b2) => b2.likes - b1.likes
    
  return (
    <div>
      <h2>blogs</h2>
      <Notification errorMessage={errorMessage} successMessage={successMessage} />
      {user === null ?
        <LoginForm
        handleLogin={handleLogin}
        username={username}
        setUsername={setUsername}
        setPassword={setPassword}
        password={password}
      /> :

      <div>
        <p>{user.name} logged in <button onClick={handleLogout} type='submit'>logout</button></p>
        <Togglable buttonLabel="Add a new Blog" ref = {blogFormRef}>
          <BlogForm
            createBlog = {createBlog}
          />
        </Togglable>
        {allBlogs.sort(byLikes).map(blog =>
          <Blog
          key={blog.id}
          blog={blog}
          //updatedBlog={updatedBlog}
          //deleteBlog={deleteBlog}
          />
        )}
      </div>
      }
    </div>
  )
}

export default App