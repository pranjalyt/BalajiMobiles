from fastapi import APIRouter, HTTPException, Depends, status
from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime
from app.database import get_supabase_client
from app.auth import get_current_user

router = APIRouter(prefix="/phones", tags=["phones"])


# Pydantic Models
class PhoneBase(BaseModel):
    """Base phone model with common fields"""
    name: str = Field(..., min_length=1, max_length=200)
    brand: str = Field(..., min_length=1, max_length=100)
    price: int = Field(..., gt=0)
    condition: str = Field(..., pattern="^(Good|Like New|Excellent)$")
    description: str = Field(..., min_length=10)
    images: List[str] = Field(..., min_items=1, max_items=6)
    storage: str = Field(..., min_length=1, max_length=50)
    battery: Optional[str] = Field(None, max_length=50)
    available: bool = True
    is_deal: bool = False


class PhoneCreate(PhoneBase):
    """Model for creating a new phone"""
    pass


class PhoneUpdate(BaseModel):
    """Model for updating a phone (all fields optional)"""
    name: Optional[str] = Field(None, min_length=1, max_length=200)
    brand: Optional[str] = Field(None, min_length=1, max_length=100)
    price: Optional[int] = Field(None, gt=0)
    condition: Optional[str] = Field(None, pattern="^(Good|Like New|Excellent)$")
    description: Optional[str] = Field(None, min_length=10)
    images: Optional[List[str]] = Field(None, min_items=1, max_items=6)
    storage: Optional[str] = Field(None, min_length=1, max_length=50)
    battery: Optional[str] = Field(None, max_length=50)
    available: Optional[bool] = None
    is_deal: Optional[bool] = None


class PhoneResponse(PhoneBase):
    """Model for phone response with ID and timestamp"""
    id: str
    created_at: str


# API Endpoints
@router.get("/", response_model=List[PhoneResponse])
async def get_all_phones(
    available_only: bool = True,
    brand: Optional[str] = None,
    min_price: Optional[int] = None,
    max_price: Optional[int] = None,
    deals_only: bool = False
):
    """
    Get all phones with optional filters
    
    Query Parameters:
    - available_only: Only show available phones (default: True)
    - brand: Filter by brand name
    - min_price: Minimum price filter
    - max_price: Maximum price filter
    - deals_only: Only show phones marked as deals (default: False)
    """
    try:
        supabase = get_supabase_client()
        
        # Build query
        query = supabase.table("phones").select("*")
        
        # Apply filters
        if available_only:
            query = query.eq("available", True)
        
        if deals_only:
            query = query.eq("is_deal", True)
        
        if brand:
            query = query.eq("brand", brand)
        
        if min_price is not None:
            query = query.gte("price", min_price)
        
        if max_price is not None:
            query = query.lte("price", max_price)
        
        # Order by newest first
        query = query.order("created_at", desc=True)
        
        # Execute query
        response = query.execute()
        
        return response.data
    
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to fetch phones: {str(e)}"
        )


@router.get("/brands", response_model=List[str])
async def get_all_brands(available_only: bool = True):
    """
    Get all unique brand names from the database
    
    Query Parameters:
    - available_only: Only include brands that have available phones (default: True)
    """
    try:
        supabase = get_supabase_client()
        
        # Build query
        query = supabase.table("phones").select("brand")
        
        # Apply filters
        if available_only:
            query = query.eq("available", True)
        
        # Execute query
        response = query.execute()
        
        # Extract unique brands
        brands = list(set([phone['brand'] for phone in response.data]))
        brands.sort()  # Sort alphabetically
        
        return brands
    
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to fetch brands: {str(e)}"
        )


@router.get("/{phone_id}", response_model=PhoneResponse)
async def get_phone_by_id(phone_id: str):
    """
    Get a single phone by ID
    
    Path Parameters:
    - phone_id: UUID of the phone
    """
    try:
        supabase = get_supabase_client()
        
        response = supabase.table("phones").select("*").eq("id", phone_id).execute()
        
        if not response.data:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Phone with ID {phone_id} not found"
            )
        
        return response.data[0]
    
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to fetch phone: {str(e)}"
        )


@router.post("/", response_model=PhoneResponse, status_code=status.HTTP_201_CREATED)
async def create_phone(
    phone: PhoneCreate,
    current_user: dict = Depends(get_current_user)
):
    """
    Create a new phone listing (Admin only)
    
    Requires authentication token in Authorization header
    """
    try:
        supabase = get_supabase_client()
        
        # Prepare phone data
        phone_data = phone.model_dump()
        
        # Insert into database
        response = supabase.table("phones").insert(phone_data).execute()
        
        if not response.data:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to create phone"
            )
        
        return response.data[0]
    
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to create phone: {str(e)}"
        )


@router.put("/{phone_id}", response_model=PhoneResponse)
async def update_phone(
    phone_id: str,
    phone_update: PhoneUpdate,
    current_user: dict = Depends(get_current_user)
):
    """
    Update a phone listing (Admin only)
    
    Path Parameters:
    - phone_id: UUID of the phone to update
    
    Requires authentication token in Authorization header
    """
    try:
        supabase = get_supabase_client()
        
        # Check if phone exists
        existing = supabase.table("phones").select("*").eq("id", phone_id).execute()
        if not existing.data:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Phone with ID {phone_id} not found"
            )
        
        # Prepare update data (exclude None values)
        update_data = phone_update.model_dump(exclude_none=True)
        
        if not update_data:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="No fields to update"
            )
        
        # Update phone
        response = supabase.table("phones").update(update_data).eq("id", phone_id).execute()
        
        if not response.data:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to update phone"
            )
        
        return response.data[0]
    
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to update phone: {str(e)}"
        )


@router.delete("/{phone_id}", status_code=status.HTTP_200_OK)
async def mark_phone_as_sold(
    phone_id: str,
    current_user: dict = Depends(get_current_user)
):
    """
    Mark a phone as sold (Admin only)
    
    This sets available=False instead of deleting the record
    
    Path Parameters:
    - phone_id: UUID of the phone to mark as sold
    
    Requires authentication token in Authorization header
    """
    try:
        supabase = get_supabase_client()
        
        # Check if phone exists
        existing = supabase.table("phones").select("*").eq("id", phone_id).execute()
        if not existing.data:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Phone with ID {phone_id} not found"
            )
        
        # Mark as sold
        response = supabase.table("phones").update({"available": False}).eq("id", phone_id).execute()
        
        if not response.data:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to mark phone as sold"
            )
        
        return {
            "message": "Phone marked as sold successfully",
            "phone_id": phone_id
        }
    
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to mark phone as sold: {str(e)}"
        )
