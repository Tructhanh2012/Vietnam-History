import mysql from "mysql";

export function connectToDatabase() {
  const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456",
    database: "lichsuvietnam",
  });

  return connection;
}
