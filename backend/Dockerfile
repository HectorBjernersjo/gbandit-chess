FROM rust:1.93.1-bookworm AS builder
WORKDIR /app

COPY Cargo.toml Cargo.lock ./
COPY src ./src

RUN cargo build --release --locked

FROM debian:bookworm-slim
WORKDIR /app

RUN apt-get update \
    && apt-get install -y --no-install-recommends ca-certificates \
    && rm -rf /var/lib/apt/lists/* \
    && useradd --system --create-home --uid 10001 appuser

COPY --from=builder /app/target/release/chess-backend /usr/local/bin/chess-backend

EXPOSE 8080

USER appuser

ENTRYPOINT ["/usr/local/bin/chess-backend"]

