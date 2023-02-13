import { db } from "../db.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


export const register = (req, res) => {
    // check existing user
    const q = "SELECT * FROM users WHERE email = ? OR username = ?";

    db.query(q, [req.body.email, req.body.username], (err, data) => {
        if (err) return res.json(err)
        console.log(data)
        if (data.length) return res.status(409).json("User already exists!")

        // hash the password and create a user
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const q = "INSERT INTO users(`username`, `email`, `password`) VALUES (?) ";
        const values = [req.body.username, req.body.email, hash];

        db.query(q, [values], (err, data) => {
            if (err) return res.json(err);
            return res.status(200).json("User has been created");

        })


    })



}

export const login = (req, res) => {
    // console.log("test ")
    const q = 'SELECT * FROM users WHERE username = ?'
    db.query(q, [req.body.username], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length === 0) return res.status(404).json("User not found!");
        // console.log("test ")
        // 数据库返回的数据格式如下
        // data: [
        //     RowDataPacket {
        //       id: 2,
        //       username: 'florian',
        //       email: 'florian@gmail.com',
        //       password: '$2b$10$zPqLssGhjviDHHcIHLru3ulkIQnJuzOBY.wudJ5USTXERBLXDLvZK',
        //       img: null
        //     }
        //   ]
        // Check password
        const isPasswordCorrect = bcrypt.compareSync(req.body.password, data[0].password)
        if (!isPasswordCorrect) return res.status(400).json('Wrong Username or Password');

        // 使用jwt
        const token = jwt.sign({ id: data[0].id }, 'jwtkey');
        // console.log('auth',token)
        // 把password提出来，不作为cookie发送出去
        const { password, ...other } = data[0]

        res.cookie("access_token", token, {
            httpOnly: true,
        }).status(200).json(other);

    })


}

export const logout = (req, res) => {
    res.clearCookie("access_token", {
        sameSite: 'none',
        secure: true,
    }).status(200).json("User has been logged out.");
};

