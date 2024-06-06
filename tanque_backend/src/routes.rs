// routes.rs

use actix_web::web;
use crate::handlers::{get_tank_description, get_image, get_tank_name};

pub fn configure_routes(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::resource("/api/tanksdescription/{tank_id}")
            .route(web::get().to(get_tank_description))
    );
    cfg.service(
        web::resource("/api/images/{tank_id}")
            .route(web::get().to(get_image))
    );
    cfg.service(
        web::resource("/api/tankname/{tank_id}")
            .route(web::get().to(get_tank_name))
    );
}
