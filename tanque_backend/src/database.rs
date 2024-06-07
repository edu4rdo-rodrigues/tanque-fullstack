use rusqlite::{Connection, Result};
use serde::Serialize;

#[derive(Debug, Serialize)]
pub struct Tank {
    pub id: i32,
    pub name: String,
    pub name_decorated: String,
    pub description: String,
    pub image: Vec<u8>, // Mantém como Vec<u8> para armazenar como BLOB
}

pub fn establish_connection() -> Result<Connection> {
    Connection::open("tanks_database.db")
}

pub fn create_table(conn: &Connection) -> Result<()> {
    conn.execute(
        "CREATE TABLE IF NOT EXISTS tanks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            name_decorated TEXT NOT NULL,
            description TEXT,
            image BLOB
        )",
        [],
    )?;
    Ok(())
}

pub fn get_tank(conn: &Connection, id: i32) -> Result<Option<Tank>> {
    let mut stmt = conn.prepare("SELECT id, name, name_decorated, description, image FROM tanks WHERE id = ?")?;
    let mut rows = stmt.query(rusqlite::params![id])?;

    if let Some(row) = rows.next()? {
        let tank = Tank {
            id: row.get(0)?,
            name: row.get(1)?,
            name_decorated: row.get(2)?,
            description: row.get(3)?,
            image: row.get(4)?,
        };
        Ok(Some(tank))
    } else {
        Ok(None)
    }
}

pub fn get_all_tanks(conn: &Connection) -> Result<Vec<Tank>> {
    let mut stmt = conn.prepare("SELECT id, name, name_decorated, description, image FROM tanks")?;
    let rows = stmt.query_map([], |row| {
        Ok(Tank {
            id: row.get(0)?,
            name: row.get(1)?,
            name_decorated: row.get(2)?,
            description: row.get(3)?,
            image: row.get(4)?,
        })
    })?;

    let mut tanks = Vec::new();
    for tank in rows {
        tanks.push(tank?);
    }

    Ok(tanks)
}