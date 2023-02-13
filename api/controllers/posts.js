import { db } from '../db.js';
import jwt from 'jsonwebtoken';

// 获取所有post
export const getPosts = (req, res) => {
    // 取请求URL中的cat信息
    const q = req.query.cat ?
        "SELECT * FROM posts WHERE cat=?" :
        "SELECT * FROM posts";
    db.query(q, [req.query.cat], (err, data) => {
        // 500 服务器内部错误，无法完成请求
        if (err) return res.status(500).send(err);
        return res.status(200).json(data);
    })

}
// 获取单个post
export const getPost = (req, res) => {
    // 利用JOIN获取两个表的信息，postid -> post信息 -> 根据p.uid查找用户信息
    const q = 'SELECT p.id, `username`, `title`, `desc`, p.img, u.img as userImg, `cat`, `date` FROM users u JOIN posts p ON u.id = p.uid WHERE p.id = ? ';

    // console.log(req)
    // req中params是一个对象
    db.query(q, [req.params.id], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data[0])
    })

}

export const addPost = (req, res) => {
    // TODO 需要用jwt做用户验证，这里偷懒就不做了
    const q = 'INSERT INTO post(`title`, `desc`, `img`, `cat`, `date`, `uid`) VALUES(?)';
    const values = [
        req.body.title,
        req.body.desc,
        req.body.img,
        req.body.cat,
        req.body.date,
        req.body.uid
    ]
    db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err);

        return res.json("Post has been created")
    })



}
export const deletePost = (req, res) => {
    console.log("from delete")
    // 利用jwt验证用户是否有权限删除(作者才有权限)
    // TODO 为什么获取不到cookie，此处是一个空值
    const token = req.cookies.access_token;
    console.log(req)
    if (!token) return res.status(401).json("Not Authenticated!");
    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");
        console.log("from deleted")
        const postId = req.params.id;
        const q = "DELETE FROM posts WHERE `id` = ？ AND `uid` = ?"
        db.query(q, [postId, userInfo.id], (err, data) => {
            if (err) return res.status(403).json('You can delete only your post!');
            return res.json("Post has been deleted!");

        })
    })

}
export const updatePost = (req, res) => {
    // 同样需要做用户验证，这里偷懒了
    const postId = req.params.id;

    const q = " UPDATE posts SET `title` = ? ,`desc` = ?, `img` = ? ,`cat`=? WHERE `id`=? ";
    const values = [
        req.body.title,
        req.body.desc,
        req.body.img,
        req.body.cat,
    ]
    console.log(postId, req.body.user)
    db.query(q, [...values, postId], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json("Post has been updated")
    })
}



