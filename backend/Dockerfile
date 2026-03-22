# syntax=docker/dockerfile:1.7

FROM rust:1-bookworm

WORKDIR /app

COPY Cargo.toml Cargo.lock ./
COPY src ./src

RUN --mount=type=cache,target=/usr/local/cargo/registry \
    --mount=type=cache,target=/app/target \
    cargo build \
    && cp /app/target/debug/chess-backend /usr/local/bin/chess-backend

EXPOSE 8080

CMD ["/usr/local/bin/chess-backend"]
