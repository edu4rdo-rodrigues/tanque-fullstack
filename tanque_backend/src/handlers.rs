// handlers.rs

use actix_web::{web, HttpResponse, Responder};
use std::sync::{Arc, Mutex};
use crate::database;

pub async fn get_tank_description(db: web::Data<Arc<Mutex<rusqlite::Connection>>>, tank_id: web::Path<i32>) -> impl Responder {
    let conn = db.lock().unwrap();
    let tank = database::get_tank(&conn, tank_id.into_inner()).expect("Tank not found");
    match tank {
        Some(tank) => HttpResponse::Ok().json(tank),
        None => HttpResponse::NotFound().finish(),
    }
}

pub async fn get_image(db: web::Data<Arc<Mutex<rusqlite::Connection>>>, tank_id: web::Path<i32>) -> impl Responder {
    let conn = db.lock().unwrap();
    let tank = database::get_tank(&conn, tank_id.into_inner()).expect("Tank not found");
    match tank {
        Some(tank) => HttpResponse::Ok()
            .content_type("image/jpeg")
            .body(tank.image),
        None => HttpResponse::NotFound().finish(),
    }
}

pub async fn get_tank_name(db: web::Data<Arc<Mutex<rusqlite::Connection>>>, tank_id: web::Path<i32>) -> impl Responder {
    let conn = db.lock().unwrap();
    match database::get_tank(&conn, tank_id.into_inner()) {
        Ok(Some(tank)) => HttpResponse::Ok().json(&tank.name),
        Ok(None) => HttpResponse::NotFound().finish(),
        Err(_) => HttpResponse::InternalServerError().finish(),
    }
}