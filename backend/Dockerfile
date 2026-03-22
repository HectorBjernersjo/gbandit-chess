# syntax=docker/dockerfile:1.7

FROM rust:1.93.1-bookworm

WORKDIR /app

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
       pkg-config \
       libssl-dev \
       ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# Optional but very useful for fast inner-loop rebuilds
RUN cargo install cargo-watch

# Prime dependency cache
COPY Cargo.toml Cargo.lock ./
RUN mkdir -p src && \
    printf 'fn main() {}\n' > src/main.rs && \
    cargo build --locked && \
    rm -rf src

# App source comes later so dependency layers stay cached
COPY . .

EXPOSE 8080

CMD ["cargo", "run", "--locked"]
