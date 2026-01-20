import { Pool } from 'pg'

const newPool = new Pool({
    host:'postgres',
    user:'postgres',
    password: '1234',
    database:'railway',
    port:5432
})

export default newPool;