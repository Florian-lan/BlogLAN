import axios from 'axios'
import React from 'react'
import {
  useState,
  useContext
} from 'react'
import { Link, useNavigate } from 'react-router-dom'
// import { login } from '../../../../api/controllers/auth'
import { AuthContext } from '../../context/authContext.js'



import './style.scss'

const Login = () => {
  const [inputs, setInputs] = useState({
    username: '',
    password: '',
  })
  const [err, setError] = useState(null)
  // 从上下文中取出共享变量
  const { login } = useContext(AuthContext)
  // console.log(login)
  const navigate = useNavigate()

  const handleChange = e => {
    setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }
  const handleSubmit = async (e) => {
    // 不取消掉默认事件的话，会刷新页面
    e.preventDefault();
    try {
      // await axios.post('http://localhost:8800/api/auth/login', inputs)
      await login(inputs);
      navigate('/');
    } catch (err) {
      // console.log("it is err from login",err)
      setError(err.response.data)
    }

  }
  return (
    <div className='auth'>
      <h1> Login</h1>
      <form>
        <input required type="text" name="username" placeholder='username' onChange={handleChange} />
        <input required type="password" name="password" placeholder='password' onChange={handleChange} />
        <button onClick={handleSubmit}>Login</button>
        {err && <p>{err}</p>}
        <span> Don't you have an account?
          <Link to='/register'>Register</Link>
        </span>
      </form>
    </div>
  )
}

export default Login