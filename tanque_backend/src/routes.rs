// routes.rs

use actix_web::web;
use crate::handlers::{get_all_tanks_handler, get_image, get_tank_description, get_tank_name, get_tank_name_decorated};

pub fn configure_routes(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::resource("/api/tank_name/{tank_id}")
            .route(web::get().to(get_tank_name))
    );
    cfg.service(
        web::resource("/api/tank_name_decorated/{tank_id}")
            .route(web::get().to(get_tank_name_decorated))
    );
    cfg.service(
        web::resource("/api/tank_description/{tank_id}")
            .route(web::get().to(get_tank_description))
    );
    cfg.service(
        web::resource("/api/tank_img/{tank_id}")
            .route(web::get().to(get_image))
    );
    cfg.service(
        web::resource("/api/tanks")
            .route(web::get().to(get_all_tanks_handler))
    );

}
