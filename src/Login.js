import {createContext, useRef, useState, useEffect, useContext, useMemo} from 'react'
import AuthContext from "./context/AuthProvider"
import './App.js'
import './Register'
import axios from 'axios'
const LOGIN_URL = '/auth'

const Login = () => {
  const {setAuth} = useContext(AuthContext)
  const userRef = useRef()
  const errRef = useRef()

// set states for user, password, errors or success
  const [user, setUser] = useState('')
  const [pwd, setPwd] = useState('')
  const [errMsg, setErrMsg] = useState('')
  const [success, setSuccess] = useState(false)
  const [currentUser, setCurrentUser] = useState('')
  const value = useMemo(
    () => ({currentUser, setCurrentUser}),
    [currentUser]
  )

  useEffect(() => {
    userRef.current.focus()
  }, [])

  useEffect(() => {
    setErrMsg('')
  }, [user, pwd])

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post('https://plantwateringapi.herokuapp.com/auth',
          {
            username: user,
            password: pwd
          }
      )
      console.log(JSON.stringify(response?.data));
        // console.log(JSON.stringify(response));


      setUser('')
      setPwd('')
      setSuccess(true)
      setCurrentUser(user)
    } catch (err) {
      // if (!err?.response) {
      //           setErrMsg('No Server Response');
      //       }
      //   else if (err.response?.status === 400) {
      //   // 400 = information that was expected is not being received
      //   setErrMsg('Missing Username or Password')
      // } else if (err.response?.status === 401) {
      //   // 401 = unauthorized
      //   setErrMsg('Unauthorized')
      // } else {
      //   setErrMsg('Login Attempt Failed')
      // }
      errRef.current.focus()
    }

  }

  return (
    <>
      {success ? (
        <section>
          <h1>You are now logged in!</h1>
          <br/>
          <p>
            <a href="/">Go to Home</a>
          </p>
        </section>
      ) : (
    <section>
      <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username: </label>
        <input
          type="text"
          id="username"
          ref={userRef}
          autoComplete="off"
          onChange={(e) => setUser(e.target.value)}
          value={user}
          required
        />

        <label htmlFor="password">Password: </label>
        <input
          type="password"
          id="password"
          onChange={(e) => setPwd(e.target.value)}
          value={pwd}
          required
        />

        <button>Sign In</button>
      </form>
          <p>
            Need an Account?<br/>
            <span className="line">
              {}
              <a href="#">Sign Up</a>
            </span>
          </p>
        </section>
      )}
    </>
  )
}

export default Login
