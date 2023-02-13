import axios from 'axios'
import React from 'react'
import { useState, useEffect } from 'react'
import dummy from '../../Data/dummyPosts.json'
import './style.scss'
const Menu = ({ cat }) => {
    // const posts = dummy.movies;
    // console.log(posts)
    const [posts, setPosts] = useState([])
    useEffect(() => {

        const fetchData = async () => {
            try {
                const res = await axios.get(`http://localhost:8800/api/posts/?cat=${cat}`)
                setPosts(res.data)

            } catch (err) {
                console.log(err)
            }
        }
        fetchData();
    }, [cat])

    return (
        <div className="menu">
            {
                posts.map((post) => (
                    <div className="post" key={post.id}>
                        <img src={`../upload/${post?.img}`} alt={post.imgName} />
                        <h2 className="title">{post.title}</h2>
                        <button className="btn"> Read More</button>
                    </div>
                ))
            }
        </div>
    )
}

export default Menu;