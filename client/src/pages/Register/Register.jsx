import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

import "./style.scss"

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  })

  // 显示注册的错误信息
  const [err, setError] = useState(null)
  const navigate = useNavigate()




  const handleChange = e => {
    // 基于之前的状态进行更新
    setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }


  // 加上async，表示异步操作
  const handleSubmit = async e => {
    // 阻止button的默认行为，也就是submit
    e.preventDefault();
    try {
      // 这里地址可以只写后面一部分，是因为在package.json文件中设置了代理
      // TODO 在package.json中添加此行出问题 "proxy":"http://localhost:8800/api/"
      // const res = await axios.post('/auth/register',inputs)
      const res = await axios.post('http://localhost:8800/api/auth/register', inputs);

      // 注册成功转到登录
      navigate('/login');
      console.log(res)
    } catch (err) {
      
      setError(err.response.data)
      // console.log(err)
    }

  }
  // console.log(inputs)
  return (
    <div className='auth'>
      <h1> Register</h1>
      <form>
        <input required type="text" name="username" placeholder='username' onChange={handleChange} />
        <input required type="email" name="email" placeholder='email' onChange={handleChange} />
        <input required type="password" name="password" placeholder='password' onChange={handleChange} />
        <button onClick={handleSubmit}>Register</button>
        {err && <p>{err}</p>}
        <span> Do you have an account?
          <Link to='/login'>Login</Link>
        </span>
      </form>
    </div>
  )
}

export default Register