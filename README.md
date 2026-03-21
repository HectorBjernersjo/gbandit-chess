# Chess Example

This folder contains a minimal tenant app you can use to test the platform end to end.

## Structure

- `frontend/`: static files to upload and publish through the control API
- `backend/`: Rust HTTP service to build into a tenant backend image

## Backend

Build the backend image from the backend directory:

```bash
docker build -t chess-backend:dev ./chess/backend
```

If you are using the `gbandit` k3d cluster:

```bash
k3d image import chess-backend:dev -c gbandit
```

Then create the tenant:

```bash
curl -X POST http://api.gbandit.com/tenants \
  -H 'content-type: application/json' \
  -d '{"slug":"chess","backend_image":"chess-backend:dev"}'
```

## Frontend

Create a zip from the frontend directory:

```bash
cd chess/frontend
zip -r ../frontend.zip .
```

Upload and publish it:

```bash
curl -X POST \
  -F 'bundle=@./chess/frontend.zip' \
  http://api.gbandit.com/tenants/chess/frontend/uploads
```

Use the returned `upload_id` as `source_path`:

```bash
curl -X POST http://api.gbandit.com/tenants/chess/frontend/releases \
  -H 'content-type: application/json' \
  -d '{"release_id":"dev-1","source_path":"upload-..."}'
```

## Local host entry

For browser testing, make sure `chess.gbandit.com` resolves to your local k3d load balancer:

```txt
127.0.0.1 chess.gbandit.com
```

