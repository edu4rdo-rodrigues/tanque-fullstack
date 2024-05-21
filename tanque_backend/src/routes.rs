use actix_web::web;
use crate::handlers::{get_tank_description, get_image};

pub fn configure_routes(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::resource("/api/tanks/{tank_id}")
            .route(web::get().to(get_tank_description))
    );
    cfg.service(
        web::resource("/api/images/{tank_id}")
            .route(web::get().to(get_image))
    );
}
