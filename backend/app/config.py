from pydantic_settings import BaseSettings
from functools import lru_cache
from typing import List
import os


class Settings(BaseSettings):
    """Application settings loaded from environment variables"""
    
    # Supabase Configuration
    supabase_url: str
    supabase_key: str
    supabase_jwt_secret: str
    
    # API Configuration
    api_title: str = "Balaji Enterprises API"
    api_version: str = "1.0.0"
    
    # CORS Configuration
    frontend_url: str = "http://localhost:5173"
    # Additional frontend URLs (comma-separated in env, or space-separated)
    additional_frontend_urls: str = ""
    
    class Config:
        env_file = ".env"
        case_sensitive = False
    
    def get_cors_origins(self) -> List[str]:
        """Get list of allowed CORS origins"""
        origins = [
            self.frontend_url,
            "http://localhost:5173",
            "http://localhost:3000",
        ]
        
        # Parse additional URLs from environment
        if self.additional_frontend_urls:
            # Support both comma and space separated
            additional = self.additional_frontend_urls.replace(",", " ").split()
            origins.extend([url.strip() for url in additional if url.strip()])
        
        # Also check for VERCEL_URL environment variable (set by Vercel)
        vercel_url = os.getenv("VERCEL_URL")
        if vercel_url:
            origins.append(f"https://{vercel_url}")
        
        # Remove duplicates while preserving order
        seen = set()
        unique_origins = []
        for origin in origins:
            if origin not in seen:
                seen.add(origin)
                unique_origins.append(origin)
        
        return unique_origins


@lru_cache()
def get_settings() -> Settings:
    """Get cached settings instance"""
    return Settings()
