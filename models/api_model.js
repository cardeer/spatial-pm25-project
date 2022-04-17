const db = require("../database");

module.exports.getAllData = async () => {
  const result = await db.query(`select * from AirPollutionPM25`);

  return result?.recordset;
};

module.exports.qa = async (year) => {
  const result = await db.query(
    `select * from AirPollutionPM25 where Year = ${year}`
  );

  return result?.recordset;
};

module.exports.qb = async () => {
  const result = await db.query(`
    declare @bangkok geometry
    select @bangkok = Geom
    from AirPollutionPM25
    where city = 'Bangkok'

    select distinct top 50 city, country, latitude, longitude, Geom.MakeValid().STDistance(@bangkok) dist
    from AirPollutionPM25
    where city <> 'Bangkok'
    order by dist asc
  `);

  return result?.recordset;
};

module.exports.qc = async () => {
  const result = await db.query(`
    declare @th geometry = 'polygon empty'
    select @th = Geom
    from world
    where name = 'Thailand'

    select * from AirPollutionPM25 where country in (
      select NAME from world where Geom.MakeValid().STTouches(@th) = 1
    ) and Year = 2018
  `);

  return result?.recordset;
};

module.exports.qd = async () => {
  const result = await db.query(`
    select geometry::EnvelopeAggregate(Geom).ToString() polygon from AirPollutionPM25 where country = 'Thailand and Year = 2009'
  `);

  if (!result.recordset[0].polygon) return [];

  let split = result?.recordset[0]?.polygon
    .replace(/POLYGON|\(|\)|,/g, "")
    .split(" ")
    .slice(1)
    .map((e) => Number.parseFloat(e));

  const data = [];

  for (let i = 0; i < split.length; i += 2) {
    data.push({
      longitude: split[i],
      latitude: split[i + 1],
    });
  }

  return data;
};

module.exports.qe = async () => {
  const result = await db.query(`
    select * from AirPollutionPM25 where country in (
      select top 1 country from AirPollutionPM25 group by country order by count(*) desc
    )
  `);

  return result?.recordset;
};

module.exports.qf = async (year) => {
  const result = await db.query(`
    select * from AirPollutionPM25 where wbinc16_text = 'Low income' and Year = ${year}
  `);

  return result?.recordset;
};
