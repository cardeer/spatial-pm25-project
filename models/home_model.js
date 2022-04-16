const db = require("../database");

module.exports.getAllData = async (country) => {
  await db.connect();
  const result = await db.instance.query(
    `select * from AirPollutionPM25 where country = '${country}'`
  );
  await db.close();

  return result.recordset;
};
