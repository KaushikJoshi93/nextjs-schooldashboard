
import mysql2 from 'mysql2/promise'



const connectDb = async()=>{

    const conn = await mysql2.createConnection({
        host:process.env.DB_HOST,
        user:process.env.DB_USERNAME,
        password:process.env.DB_PASSWORD,
        database:process.env.DATABASE_NAME
    })
    return conn;
}





export default connectDb