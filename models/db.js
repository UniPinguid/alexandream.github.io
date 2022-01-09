const sql = require("mssql");

const sqlConfig = {
  user: "testLogin",
  password: "123456",
  database: "QUANLYTHUVIEN",
  server: "localhost",
  options: {
    trustServerCertificate: true,
  },
};

exports.load = async (tbName) => {
  try {
    // make sure that any items are correctly URL encoded in the connection string
    let pool = await sql.connect(sqlConfig);
    const result = await pool.request().query(`select * from ${tbName}`);
    return result.recordset;
  } catch (err) {
    console.log(err);
  }
};

exports.get = async (tbName,fieldName,value) => {
  try {
    // make sure that any items are correctly URL encoded in the connection string
    let pool = await sql.connect(sqlConfig);
    const result = await pool.request().query(`select * from ${tbName} where ${fieldName} = '${value}'`);
    //console.log(result);
    return result.recordset;
  } catch (err) {
    console.log(err);
  }
};

exports.insert = async (tbName,stringValue) => {
  try {
    // make sure that any items are correctly URL encoded in the connection string
    let pool = await sql.connect(sqlConfig);
    const query = `insert into ${tbName} values (${stringValue})`;    
    const result = await pool.request().query(query);
  } catch (err) {
    console.log(err);
  }
};