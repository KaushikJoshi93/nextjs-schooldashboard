'use server'
import connectDb from '../utils/database'

interface IFormInput {
  school_name:string
  school_address: string
  school_city: string
  school_state: string
  school_contact: string
  school_email: string
}

export const addSchool = async(data:IFormInput)=>{
  
    try {
         const conn = await connectDb();
         // Check if the 'schools' table exists
          const [rows] = await conn.execute(
            "SELECT COUNT(*) AS count FROM information_schema.tables WHERE table_schema = ? AND table_name = 'schools'",
            [conn.config.database]
          );

          

        const tableExists = (rows as any)[0].count > 0;

        if(!tableExists){
          const query = `CREATE TABLE schools (
            id INT AUTO_INCREMENT PRIMARY KEY,
            school_name VARCHAR(255) NOT NULL,
            school_email VARCHAR(255) NOT NULL,
            school_address VARCHAR(255) NOT NULL,
            school_city VARCHAR(255) ,
            school_state VARCHAR(255) ,
            school_contact VARCHAR(15) NOT NULL,
            school_image VARCHAR(255)
          )
          `;
          await conn.execute(query);
        }

        // insert data into the table
        const insertQuery = `
          INSERT INTO schools
            (school_name, school_email, school_address, school_city, school_state, school_contact)
          VALUES
            (?, ?, ?, ?, ?, ?)
        `;

        await conn.execute(insertQuery , [
          data.school_name,
          data.school_email,
          data.school_address,
          data.school_city,
          data.school_state,
          data.school_contact,
        ])

        console.log('Data inserted into the schools table.');
     
        //  if(conn){
        //   console.log("Authorized user...")
        //  }
        console.log("disconnecting...")
        await conn.end();

        return {
          message:"School Added Successfully"
        }
       } catch (err) {
         console.log("Unable to connect..."+err)
         throw new Error("Internal Server Error")
       }
}

export const fetchAllSchools = async()=>{
  try {
    const conn = await connectDb();

    // query all the records from the schools table
    const [rows] = await conn.execute("SELECT * FROM schools");

    type rowParam = { 
      id: number;
      school_name: string ; 
      school_email: string ; 
      school_address: string ; 
      school_city: string ;
      school_state: string ; 
      school_contact: string  
    }

    const schools = (rows as any).map((row:rowParam )=>({
      id: row.id,
      school_name: row.school_name,
      school_email: row.school_email,
      school_address: row.school_address,
      school_city: row.school_city,
      school_state: row.school_state,
      school_contact: row.school_contact,
    }))

    // close the database connection
    await conn.end();

    return schools;
  } catch (err) {
    throw err;
  }
}