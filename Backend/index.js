const mysql = require('mysql');

const con = mysql.createConnection({
    host : process.env.RDS_HOSTNAME,
    user : process.env.RDS_USERNAME,
    password : process.env.RDS_PASSWORD,
    port : process.env.RDS_PORT,
    database : process.env.RDS_DATABASE
});

exports.handler = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;

    const sql = 'SELECT * FROM Sensor ORDER BY recorded DESC LIMIT 1'

    con.query(sql, (err, res) => {
        if (err) {
            console.log(err);
            throw err
        }
        
        console.log("Got data")
        
        callback(null, res[0]);
    });
};  