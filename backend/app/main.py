from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import get_settings
from app.routers import phones

settings = get_settings()

# Initialize FastAPI app
app = FastAPI(
    title=settings.api_title,
    version=settings.api_version,
    description="Backend API for Balaji Enterprises - Used Mobile Buy/Sell Platform"
)

# Configure CORS
# Get allowed origins from settings (supports multiple frontend URLs)
cors_origins = settings.get_cors_origins()

app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(phones.router)


# Health check endpoint
@app.get("/", tags=["health"])
async def root():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "service": "Balaji Enterprises API",
        "version": settings.api_version
    }


@app.get("/health", tags=["health"])
async def health_check():
    """Detailed health check"""
    return {
        "status": "healthy",
        "api_version": settings.api_version,
        "endpoints": {
            "phones": "/phones",
            "docs": "/docs",
            "redoc": "/redoc"
        }
    }
