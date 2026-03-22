use axum::{Json, Router, routing::get};
use serde::Serialize;
use std::net::SocketAddr;

#[derive(Serialize)]
struct HealthResponse {
    ok: bool,
    service: &'static str,
}

#[derive(Serialize)]
struct GameStateResponse {
    game: &'static str,
    status: &'static str,
    board: [[char; 8]; 8],
}

#[tokio::main]
async fn main() {
    tracing_subscriber::fmt()
        .with_env_filter(
            tracing_subscriber::EnvFilter::try_from_default_env()
                .unwrap_or_else(|_| "chess_backend=debug".into()),
        )
        .init();

    let app = Router::new()
        .route("/api/health", get(health))
        .route("/api/state", get(state))
        .route("/", get(root));

    let addr: SocketAddr = ([0, 0, 0, 0], 8080).into();
    tracing::info!("chess backend listening on {addr}");

    let listener = tokio::net::TcpListener::bind(addr)
        .await
        .expect("failed to bind chess backend");

    axum::serve(listener, app)
        .await
        .expect("chess backend server error");
}

async fn root() -> &'static str {
    "chess backend ok"
}

async fn health() -> Json<HealthResponse> {
    Json(HealthResponse {
        ok: true,
        service: "chess-backend-v15",
    })
}

async fn state() -> Json<GameStateResponse> {
    Json(GameStateResponse {
        game: "chess",
        status: "ready",
        board: [
            ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
            ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
            ['.', '.', '.', '.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '.', '.', '.', '.'],
            ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
            ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'],
        ],
    })
}
