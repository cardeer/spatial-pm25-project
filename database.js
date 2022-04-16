const sql = require("mssql");

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
};
