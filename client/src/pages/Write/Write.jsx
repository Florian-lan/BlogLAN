import React from 'react'
import './style.scss';
import {
  useState,
  useEffect,
} from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import moment from 'moment';

const Write = () => {
  // 从single页面接收到的state
  const state = useLocation().state;
  // console.log(state)

  const [value, setValue] = useState(state?.desc || '');
  const [title, setTitle] = useState(state?.title || '');
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(state?.cat || '');
  const navigate = useNavigate();

  const upload = async () => {
    try {
      const formData = new FormData();
      // 用户上传图片 - 更新file - 加入formData 用于发送req
      // console.log(file)
      formData.append('file', file);
      // 单独创立一个路由，用于上传数据
      const res = await axios.post('http://localhost:8800/api/upload', formData);
      // 返回上传的图片的url
      return res.data
    } catch (err) {
      console.log(err)
    }
  }
  const handlePublish = async (e) => {
    e.preventDefault();
    // 提交之前，获取用户上传的图片的url
    const imgUrl = await upload();
    console.log("posted")

    try {
      console.log('state from write', state)
      state
        // 存在state说明说明是update
        ? await axios.put(`http://localhost:8800/api/posts/${state.id}`, {
          title,
          desc: value,
          cat,
          img: file ? imgUrl : "",
          user: localStorage.getItem("user"),
        })

      // 发布新的post
      : await axios.post(`http://localhost:8800/api/posts/`, {
          title,
          desc: value,
          cat,
          img: file ? imgUrl : "",
          date: moment(Date.now()).format("YYYY-MM_DD HH:mm:ss"),
          user: localStorage.getItem("user"),
        })
      console.log("posted")
      // navigate('/');
    } catch (err) {
      console.log(err);

    }
  }
  return (
    <div className="add">
      <div className="content">
        <input type="text" placeholder={state?.title || 'Title'} onChange={e => setTitle(e.target.value)} />
        <div className="editorContainer">
          <ReactQuill className="editor" theme="snow" value={value} onChange={setValue} />
        </div>

      </div>
      <div className="menu">
        <div className="item i1">
          <h1>Publish</h1>
          <span>
            <b>Status: </b> Draft
          </span>
          <span>
            <b>Visibility: </b> Public
          </span>
          <input style={{ display: 'none' }} type="file" id="upload" onChange={e => setFile(e.target.files[0])} />
          <label className='upload' htmlFor="upload"> Upload </label>
          <div className="btns">
            <button> Save as a draft</button>
            <button onClick={handlePublish}> Publish </button>
          </div>
        </div>
        <div className="item i2">
          <h1>Category</h1>
          <div className="cat">
            <input type="radio" checked={cat==="art"}name="cat" value="art" id="art" onChange={e => setCat(e.target.value)} />
            <label htmlFor='art'>ART</label>
          </div>

          <div className="cat">
            <input type="radio" checked={cat==="science"}name="cat" value="science" id="science" onChange={e => setCat(e.target.value)} />
            <label htmlFor='science'>Science</label>
          </div>

          <div className="cat">
            <input type="radio" checked={cat==="technology"}name="cat" value="technology" id="technology" onChange={e => setCat(e.target.value)} />
            <label htmlFor='technology'>Technology</label>
          </div>

          <div className="cat">
            <input type="radio" checked={cat==="design"}name="cat" value="design" id="design" onChange={e => setCat(e.target.value)} />
            <label htmlFor='design'>Design</label>
          </div>

          <div className="cat">
            <input type="radio" checked={cat==="food"}name="cat" value="food" id="food" onChange={e => setCat(e.target.value)} />
            <label htmlFor='food'>Food</label>
          </div>


        </div>
      </div>
    </div>
  )
}

export default Write