const db = require('better-sqlite3')('database.db');

db.exec("CREATE TABLE IF NOT EXISTS spoilers (id int AUTO INCREMENT, d_name TEXT, s_name TEXT, name TEXT, chapter INT, pages INT, path TEXT)")
db.exec("CREATE TABLE IF NOT EXISTS videos (id int AUTO INCREMENT, d_name TEXT, s_name TEXT, name TEXT, chapter INT, pages INT, link TEXT)")
db.exec("CREATE TABLE IF NOT EXISTS chapters (id int AUTO INCREMENT, d_name TEXT, s_name TEXT, name TEXT, chapter INT, pages INT, path TEXT)")
db.exec("CREATE TABLE IF NOT EXISTS raws (id int AUTO INCREMENT, d_name TEXT, s_name TEXT, name TEXT, chapter INT, pages INT, path TEXT)")
db.exec("CREATE TABLE IF NOT EXISTS series (id int AUTO INCREMENT, img TEXT, name TEXT, f_name TEXT, date TEXT, author TEXT, genre TEXT, status TEXT)")
// One Piece
module.exports = db;