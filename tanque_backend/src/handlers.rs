// handlers.rs

use actix_web::{web, HttpResponse, Responder};
use std::sync::{Arc, Mutex};
use crate::database::{self};

pub async fn get_tank_name(db: web::Data<Arc<Mutex<rusqlite::Connection>>>, tank_id: web::Path<i32>) -> impl Responder {
    let conn: std::sync::MutexGuard<rusqlite::Connection> = db.lock().unwrap();
    match database::get_tank(&conn, tank_id.into_inner()) {
        Ok(Some(tank)) => HttpResponse::Ok().json(&tank.name),
        Ok(None) => HttpResponse::NotFound().finish(),
        Err(_) => HttpResponse::InternalServerError().finish(),
    }
}

pub async fn get_tank_name_decorated(db: web::Data<Arc<Mutex<rusqlite::Connection>>>, tank_id: web::Path<i32>) -> impl Responder {
    let conn: std::sync::MutexGuard<rusqlite::Connection> = db.lock().unwrap();
    match database::get_tank(&conn, tank_id.into_inner()) {
        Ok(Some(tank)) => HttpResponse::Ok().json(&tank.name_decorated),
        Ok(None) => HttpResponse::NotFound().finish(),
        Err(_) => HttpResponse::InternalServerError().finish(),
    }
}

pub async fn get_tank_description(db: web::Data<Arc<Mutex<rusqlite::Connection>>>, tank_id: web::Path<i32>) -> impl Responder {
    let conn: std::sync::MutexGuard<rusqlite::Connection> = db.lock().unwrap();
    let tank: Option<database::Tank> = database::get_tank(&conn, tank_id.into_inner()).expect("Tank not found");
    match tank {
        Some(tank) => HttpResponse::Ok().json(tank.description),
        None => HttpResponse::NotFound().finish(),
    }
}

pub async fn get_image(db: web::Data<Arc<Mutex<rusqlite::Connection>>>, tank_id: web::Path<i32>) -> impl Responder {
    let conn: std::sync::MutexGuard<rusqlite::Connection> = db.lock().unwrap();
    let tank: Option<database::Tank> = database::get_tank(&conn, tank_id.into_inner()).expect("Tank not found");
    match tank {
        Some(tank) => HttpResponse::Ok()
            .content_type("image/jpeg")
            .body(tank.image),
        None => HttpResponse::NotFound().finish(),
    }
}

pub async fn get_all_tanks_handler(db: web::Data<Arc<Mutex<rusqlite::Connection>>>) -> impl Responder {
    let conn: std::sync::MutexGuard<rusqlite::Connection> = db.lock().unwrap();
    match database::get_all_tanks(&conn) {
        Ok(tanks) => {
            let names: Vec<String> = tanks.iter().map(|tank| tank.name.clone()).collect();
            HttpResponse::Ok().json(names)
        },
        Err(_) => HttpResponse::InternalServerError().finish(),
    }
}




