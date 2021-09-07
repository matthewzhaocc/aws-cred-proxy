import express from 'express'
import morgan from 'morgan';
import v1 from '../api/v1'

const server = express();

server.use(morgan('common'))
server.use(v1())

server.listen(process.env.PORT || 3000)