import * as xlsx from "xlsx/xlsx.mjs";
import fs from "fs";
import { Readable } from "stream";
import * as cpexcel from "xlsx/dist/cpexcel.full.mjs";
import { nanoid } from "nanoid";
import SqlString from "tsqlstring";

import db from "../database.js";

export default {
  getAllData: async () => {
    const result = await db.query(`select * from AirPollutionPM25`);

    return result?.recordset;
  },

  qa: async (year) => {
    const result = await db.query(
      `select * from AirPollutionPM25 where Year = ${year}`
    );

    return result?.recordset;
  },

  qb: async () => {
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
  },

  qc: async () => {
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
  },

  qd: async () => {
    const result = await db.query(`
    select geometry::EnvelopeAggregate(Geom).ToString() polygon from AirPollutionPM25 where country = 'Thailand' and Year = 2009
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
  },

  qe: async () => {
    const result = await db.query(`
    select * from AirPollutionPM25 where country in (
      select top 1 country from AirPollutionPM25 group by country order by count(*) desc
    )
  `);

    return result?.recordset;
  },

  qf: async (year) => {
    const result = await db.query(`
    select * from AirPollutionPM25 where wbinc16_text = 'Low income' and Year = ${year}
  `);

    return result?.recordset;
  },

  q4a: async () => {
    const result = await db.query(`
    select country, city from AirPollutionPM25 where conc_pm25 = '>50' and Year = 2015
  `);

    return result?.recordset;
  },

  q4b: async () => {
    const result = await db.query(`
    select country, avg(pm25) pm25_avg from AirPollutionPM25 group by country order by pm25_avg desc
  `);

    return result?.recordset;
  },

  q4c: async (country) => {
    const result = await db.query(`
    select country, Year, pm25 from AirPollutionPM25 where lower(country) = '${country.toLowerCase()}' order by Year asc
  `);

    return result?.recordset;
  },

  q4d: async (year, color) => {
    const result = await db.query(`
    select sum(population) affected from AirPollutionPM25 where year = ${year} and color_pm25 = '${color}'
  `);

    return result?.recordset;
  },

  removeFile: (id) => {
    fs.unlinkSync(`tmp/${id}.xlsx`);
  },

  toExcel: (data) => {
    xlsx.set_fs(fs);
    xlsx.stream.set_readable(Readable);
    xlsx.set_cptable(cpexcel);

    const sheet = xlsx.utils.json_to_sheet(data);
    const wb = xlsx.utils.book_new();

    xlsx.utils.book_append_sheet(wb, sheet, "export");

    const id = nanoid();
    xlsx.writeFileSync(wb, `tmp/${id}.xlsx`);

    return id;
  },

  insertToDB: async (file) => {
    xlsx.set_fs(fs);
    xlsx.stream.set_readable(Readable);
    xlsx.set_cptable(cpexcel);

    const wb = xlsx.read(file);
    const sheet = wb.Sheets[wb.SheetNames[0]];

    const data = xlsx.utils.sheet_to_json(sheet);

    try {
      await db.connect();

      for (let i = 0; i < data.length; i++) {
        const e = data[i];

        const sql = SqlString.format(
          `
        insert into AirPollutionPM25 (
          country, city, Year, pm25, latitude, longitude, population, wbinc16_text, Region, conc_pm25, color_pm25, Geom
        )
        values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
        `,
          [
            e.country,
            e.city,
            e.Year,
            e.pm25,
            e.latitude,
            e.longitude,
            e.population,
            e.wbinc16_text,
            e.Region,
            e.conc_pm25,
            e.color_pm25,
            null,
          ]
        );

        await db.instance.query(sql);
      }

      await db.instance.query(`
        update AirPollutionPM25
        set Geom = geometry::STGeomFromText(
          'POINT(' + convert(nvarchar(255), longitude) + ' ' + convert(nvarchar(255), latitude) + ')',
          4326
        );
      `);

      await db.close();
    } catch (e) {
      console.log(e);
      return false;
    }

    return true;
  },
};
