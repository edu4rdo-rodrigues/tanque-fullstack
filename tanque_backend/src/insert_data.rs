use rusqlite::{params, Connection, Result};
use std::fs::File;
use std::io::{self, Read};
use std::path::Path;
use thiserror::Error;

#[derive(Debug)]
struct Tank {
    name: String,
    description: String,
    image: Vec<u8>,
}

#[derive(Error, Debug)]
enum CustomError {
    #[error("Rusqlite error: {0}")]
    Rusqlite(#[from] rusqlite::Error),

    #[error("IO error: {0}")]
    Io(#[from] io::Error),
}

fn establish_connection() -> Result<Connection, CustomError> {
    Ok(Connection::open("database.db")?)
}

fn create_table(conn: &Connection) -> Result<(), CustomError> {
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

fn insert_tank(conn: &Connection, tank: &Tank) -> Result<(), CustomError> {
    conn.execute(
        "INSERT INTO tanks (name, description, image) VALUES (?, ?, ?)",
        params![tank.name, tank.description, tank.image],
    )?;
    Ok(())
}

fn read_image_from_file<P: AsRef<Path>>(path: P) -> Result<Vec<u8>, CustomError> {
    let mut file = File::open(path)?;
    let mut buffer = Vec::new();
    file.read_to_end(&mut buffer)?;
    Ok(buffer)
}

fn main() -> Result<(), CustomError> {
    let conn = establish_connection()?;
    create_table(&conn)?;

    // Carregar a imagem de um arquivo
    let image_buffer = read_image_from_file("../public/imgs/T-80.jpeg")?;

    let new_tank = Tank {
        name: String::from("T-80"),
        description: String::from("O tanque T-80 é o primeiro do mundo com um motor de turbina a gás, frequentemente apelidado de \"helicóptero\" ou \"jato\" por seu som específico. O motor desse tanque pode consumir tanto querosene, como diesel, mas, em situações de emergência, pode ser abastecido com óleo combustível, gás natural, gás de água, álcool, combustível de navios e até carvão moído.\n\nEmbora o motor do T-80 possa consumir todos os tipos de combustível, ele é tecnicamente muito complexo, e não pode ser consertado em condições de guerra. Além disso, o tanque consome cerca de 8 litros de combustível por quilômetro, enquanto, por exemplo, o motor a diesel do T-72 consome apenas entre 2 e 4 litros por quilômetro."),
        image: image_buffer,
    };

    insert_tank(&conn, &new_tank)?;

    println!("Dados inseridos com sucesso!");

    Ok(())
}
