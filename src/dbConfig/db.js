import { Pool } from 'pg'

const newPool = new Pool({
    host:'localhost',
    user:'postgres',
    password: '123456',
    database:'cronappsdatabase',
    port:5432
})

export default newPool;