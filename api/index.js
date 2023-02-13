import express from "express"
import cors from 'cors'
import postRoutes from './routes/posts.js'
import userRoutes from './routes/users.js'
import authRoutes from './routes/auth.js'
import cookieParser from 'cookie-parser'
import { db } from "./db.js"
import multer from 'multer';

const app = express()

app.use(express.json())
app.use(cors())
app.use(cookieParser())


app.get('/test', (req, res) => {
    res.json(" Testing!")
})


// 新建路由用于upload图片数据
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // 指定图片上传地址
        cb(null, '../client/public/upload');
    },
    filename: function (req, file, cb) {
        // 名字加上日期是为了防止重名造成覆盖
        cb(null, Date.now() + file.originalname)
    }
})
const upload = multer({ storage })
app.post('/api/upload', upload.single('file'), function (req, res) {
    const file = req.file;
    // 上传完成之后，将文件名放入res中传回去
    console.log("itis filename", file)
    res.status(200).json(file?.filename);
})

// 使用中间件将路由添加进来
app.use("/api/posts", postRoutes)
app.use("/api/users", userRoutes)
app.use("/api/auth", authRoutes)

app.listen(8800, () => {
    console.log('Connected!');
})