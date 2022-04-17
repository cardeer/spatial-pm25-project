const sql = require("mssql");

/**
 * Database class that handle all important parts. All methods are static that means you can use it without new keyword
 */

module.exports = class Database {
  static async connect() {
    try {
      this.instance = await sql.connect(
        `Server=localhost,1433;Database=SpatialDB3;User Id=${process.env.DB_USER};Password=${process.env.DB_PASSWORD};Encrypt=false`
      );
    } catch (err) {
      console.log(err);
    }
  }

  static async close() {
    if (this.instance != null) {
      await this.instance.close();
    }
  }

  static async query(str) {
    try {
      await this.connect();

      const result = await this.instance.query(str);

      await this.close();
      return result;
    } catch (e) {
      await this.close();
      console.log(e);
    }
  }
};
