from fastapi import HTTPException, Security, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import jwt, JWTError
from app.config import get_settings

settings = get_settings()
security = HTTPBearer()


def verify_jwt_token(credentials: HTTPAuthorizationCredentials = Security(security)) -> dict:
    """
    Verify JWT token from Supabase Auth
    
    Args:
        credentials: HTTP Authorization credentials with Bearer token
        
    Returns:
        Decoded token payload with user information
        
    Raises:
        HTTPException: If token is invalid or expired
    """
    token = credentials.credentials
    
    try:
        # Decode and verify JWT token using Supabase JWT secret
        payload = jwt.decode(
            token,
            settings.supabase_jwt_secret,
            algorithms=["HS256"],
            audience="authenticated"
        )
        return payload
    except JWTError as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Invalid authentication token: {str(e)}",
            headers={"WWW-Authenticate": "Bearer"},
        )


def get_current_user(token_payload: dict = Security(verify_jwt_token)) -> dict:
    """
    Get current authenticated user from token payload
    
    Args:
        token_payload: Decoded JWT token payload
        
    Returns:
        User information dictionary
    """
    user_id = token_payload.get("sub")
    if not user_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials"
        )
    
    return {
        "id": user_id,
        "email": token_payload.get("email"),
        "role": token_payload.get("role", "user")
    }
