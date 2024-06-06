use actix_web::{web, App, HttpServer};
use actix_cors::Cors; // Importe a biblioteca Cors
use std::sync::{Arc, Mutex};

mod database;
mod handlers;
mod routes;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let conn = Arc::new(Mutex::new(database::establish_connection().expect("Failed to connect to database")));
    
    database::create_table(&conn.lock().unwrap()).expect("Failed to create table");

    HttpServer::new(move || {
        App::new()
            .app_data(web::Data::new(conn.clone())) 
            .wrap(Cors::permissive()) // Adicione o middleware Cors
            .configure(routes::configure_routes)
    })
    .bind("127.0.0.1:8080")?
    .run()
    .await
}
