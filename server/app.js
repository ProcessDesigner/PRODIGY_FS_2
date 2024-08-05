import express from "express"
import cookieParser from 'cookie-parser'
import userRoutes from './Routes/user.route.js'
import empRoutes from './Routes/employee.route.js'
import errorMiddleware from "./middlewares/error.middleware.js";
import morgan from "morgan";
import cors from 'cors'
const app = express();

app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({encoded:true}))

app.use(cors({
    origin:['http://localhost:5173'],
    credentials:true
}));
app.use('/ping',(req,res)=>{
    res.send('pong')
})
app.use('/api/v1/user',userRoutes);
app.use('/api/v1/emp',empRoutes);


app.use('*',(req,res)=>{
    res.status(404).send('404 invalid response')
})
app.use(errorMiddleware)
export default app;