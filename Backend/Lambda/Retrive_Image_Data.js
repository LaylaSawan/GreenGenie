const mysql = require('mysql'); // getting the mysql library

const con = mysql.createConnection({ // creating the connection with mysql
    host : process.env.RDS_HOSTNAME,
    user : process.env.RDS_USERNAME,
    password : process.env.RDS_PASSWORD,
    port : process.env.RDS_PORT,
    database : process.env.RDS_DATABASE
});

exports.handler = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;

    const sql = 'SELECT * FROM mydatabase.camera_data ORDER BY created_at DESC;' // selcting all from the table camera_data

    con.query(sql, (err, res) => {
        if (err) {
            console.log(err);
            throw err
        }
        
        console.log("Got data")
        console.group(res)
        callback(null, res);
    });
};  
