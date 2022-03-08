import {createContext, useRef, useState, useEffect, useContext, useMemo} from 'react'
import AuthContext from "./context/AuthProvider"
import App from './App.js'
import Register from './Register'
import axios from 'axios'
const LOGIN_URL = '/auth'

const UserContext = createContext('')

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
  const [registerCheck, setRegisterCheck]=useState(false)
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

  const openRegister = () => {
    setRegisterCheck(true)
  }

  const registerClose = () => {
    setRegisterCheck(false)
  }
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

      setCurrentUser(user)

      setPwd('')
      setSuccess(true)

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
        <UserContext.Provider value={{currentUser, setCurrentUser}}>
          <h1>{`You are now logged in! Welcome ${currentUser}`} </h1>
            <App user={currentUser} />
          </UserContext.Provider>
        </section>
      ) : (

    <section>
      <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
        <h1> Welcome to Plant₂0!</h1>
        <h2> Please sign in or create an account!</h2>
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
        <br />
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          id="password"
          onChange={(e) => setPwd(e.target.value)}
          value={pwd}
          required
        />
        <br />
        <button>Sign In</button>
      </form>
          <p>
            Need an Account?<br/>
            <span className="line">
              <button onClick={openRegister}>Sign Up!</button>
              {registerCheck ?  <>
                <Register />
                <button onClick={registerClose}>Close Register</button>
                </> : null}
            </span>
          </p>
        </section>
      )}

    </>
  )
}

export default Login
