FROM node:20-alpine AS frontend-builder
WORKDIR /app/HR_System
COPY HR_System/package*.json ./
RUN npm ci
COPY HR_System/ ./
RUN npm run build

FROM python:3.11-slim
WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV PORT=7860

COPY Backend/requirements.txt ./Backend/requirements.txt
RUN pip install --no-cache-dir -r ./Backend/requirements.txt

COPY Backend/ ./Backend/
COPY --from=frontend-builder /app/HR_System/dist ./Backend/static

WORKDIR /app/Backend
EXPOSE 7860
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "7860"]
