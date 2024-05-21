use rusqlite::{Connection, Result};
use serde::Serialize;

#[derive(Debug, Serialize)]
pub struct Tank {
    pub id: i32,
    pub name: String,
    pub description: String,
    pub image: Vec<u8>, // Mantém como Vec<u8> para armazenar como BLOB
}

pub fn establish_connection() -> Result<Connection> {
    Connection::open("database.db")
}

pub fn create_table(conn: &Connection) -> Result<()> {
    conn.execute(
        "CREATE TABLE IF NOT EXISTS tanks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            description TEXT,
            image BLOB
        )",
        [],
    )?;
    Ok(())
}

pub fn insert_tank(conn: &Connection, tank: &Tank) -> Result<()> {
    conn.execute(
        "INSERT INTO tanks (name, description, image) VALUES (?, ?, ?)",
        rusqlite::params![tank.name, tank.description, tank.image],
    )?;
    Ok(())
}

pub fn get_tank(conn: &Connection, id: i32) -> Result<Option<Tank>> {
    let mut stmt = conn.prepare("SELECT id, name, description, image FROM tanks WHERE id = ?")?;
    let mut rows = stmt.query(rusqlite::params![id])?;

    if let Some(row) = rows.next()? {
        let tank = Tank {
            id: row.get(0)?,
            name: row.get(1)?,
            description: row.get(2)?,
            image: row.get(3)?,
        };
        Ok(Some(tank))
    } else {
        Ok(None)
    }
}
