// Create a Pool for connection to PostgreSQL Database...
const Pool = require('pg').Pool;

// Initiate connection.........
const pool = new Pool({
    user:'me',
    host:'localhost',
    database:'api',
    password:'password',
    port:5432,
});

// Creating a function to get all info from database and assign to a variable.
const getUsers = (req, res)=>{
    pool.query('SELECT * FROM users ORDER BY id ASC',(error, result) => {
        if(error){
            throw error;
        }else{
            res.status(200).json(result.rows);
        }
    })
}

// Export the function..
module.exports = getUsers;

// If functions are more than one
// module.exports = {getUsers,setUsers,creatUsers};
