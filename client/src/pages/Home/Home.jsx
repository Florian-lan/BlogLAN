import axios from 'axios';
import React from 'react';
import {
  useEffect,
  useState,
} from 'react'
import {
  Link,
  useLocation
} from 'react-router-dom';
import dummy from '../../Data/dummyPosts.json';
import './style.scss';

const Home = () => {
  const [posts, setPosts] = useState([])
  const location = useLocation()
  // console.log(location)
  // location -> {pathname: '/', search: '?cat=art', hash: '', state: null, key: 'qm40o122'}

  const cat = location.search


  // const posts = dummy.movies;
  // 从数据库中获取数据
  // 使用useEffect获取posts并根据cat进行更新
  useEffect(() => {
    // 一般不会在useEffect设置为异步函数，所以单独定义一个异步函数独立出来
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/api/posts${cat}`);
        setPosts(res.data);

      } catch (err) {
        console.log(err);
      }
    }
    fetchData()
  }, [cat]);
  // 将html解析为文本
  const getText = (html) =>{
    const doc = new DOMParser().parseFromString(html,'text/html')
    return doc.body.textContent
  }
  return (
    <div className="home">
      <div className="posts">
        {posts.map((post) => (
          <div className="post" key={post.id}>
            <div className="img">
            {/* TODO post目前在数据库中没有设置添加图片名字等信息 */}
              <img src={`../upload/${post?.img}`} alt={post.imgName} />
            </div>
            <div className="content">
              <Link to={`/post/${post.id}`} className="link">
                <h1>{post.title}</h1>
                <p>{getText(post.desc)}</p>
                <div className="btn">
                  <button> Read more</button>
                </div>

              </Link>
            </div>

          </div>))
        }
      </div>

    </div>
  )
}

export default Home