import React from 'react';
import {
  useState,
  useEffect,
  useContext
} from 'react'

import {
  Link,
  useNavigate,
  useLocation
} from 'react-router-dom';
import './style.scss';
import Menu from '../../Components/Menu/Menu'
import {
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons'
import axios from 'axios';
import { AuthContext } from '../../context/authContext.js'
import moment from 'moment'


const Single = () => {
  const IMG = 'https://static.www.tencent.com/uploads/2022/12/28/646a1b54211af41b82eff20a60bdc550.png!article.cover';
  const navigate = useNavigate();
  const [post, setPost] = useState({
    id: 0,
    username: '',
    title: '',
    desc: '',
    img: '',
    userImg: '',
    cat: '',
    // date初始化TODO
    date: '1900-01-01T04:00:00.000Z',
  })
  const { currentUser } = useContext(AuthContext)

  // 获取需要显示的postid
  const location = useLocation()
  // location.pathname is like localhost:3000/post/1
  const postId = location.pathname.split('/')[2]

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/api/posts/${postId}`)
        // 根据从数据库中返回的数据设置post信息
        setPost(res.data)
        console.log(post)
        // post信息就是从数据库中返回的信息，/controllers/posts，取决于sql命令SELECT


      } catch (err) {
        console.log(err)
      }
    }
    fetchData()
    // 别忘了useEffect的依赖项，postID改变时才刷新
  }, [postId])


  const handleEdit = () => {
    {/* TODO URL 中的问号有什么作用 */ }
    navigate('/write?edit=2',{state:post});
  }

  const handleDelete = async ()=>{
    try{
      await axios.delete(`http://localhost:8800/api/posts/${postId}`);
      navigate('/');
    }catch(err){
      console.log(err)
    }
  }

  const getText = (html) =>{
    const doc = new DOMParser().parseFromString(html,'text/html')
    return doc.body.textContent
  }
  return (
    <div className="single">
      <div className="content">
        {/* <img src="../imgs/batman.jpg" alt="" /> */}
        <img src={`../upload/${post?.img}`} alt="" />
        <div className="user">
          {post.userImg && <img src={post.userImg} alt="" />}

          <div className="info">
            <span className="userName"> {post.username} </span>
            {/* {console.log(post.date)} */}
            <p>Posted {moment(post.date).fromNow()}</p>
          </div>
          <div className="func">
            {console.log(currentUser)}
            {post.username === currentUser &&
              (<div className="func">
                <EditOutlined className='edit' style={{ fontSize: '25px' }} onClick={handleEdit} />
                <DeleteOutlined className='delete' style={{ fontSize: '25px' }} onClick={handleDelete}/>
              </div>)
            }

          </div>

        </div>
        <div className="text">
          <h1 className="head">
            {post.title}
          </h1>
          <p className="plot">
            {getText(post.desc)}
          </p>
        </div>
      </div>
      <div className="menu">
      {/* 将cat传递给menu组件进行“推荐” */}
        <Menu cat={post.cat}/>
      </div>

    </div>
  )
}


export default Single