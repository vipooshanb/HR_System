# HR Management Backend

FastAPI backend for the HR dashboard frontend.

## Run locally

```bash
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

Or from this folder:

```bash
./run.sh
```

The frontend expects the API at `/api` by default. If you run the backend on a different origin, set `VITE_API_BASE_URL` in the frontend.