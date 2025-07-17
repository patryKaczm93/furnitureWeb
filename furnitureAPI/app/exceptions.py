from fastapi import HTTPException, status 

def raise_not_found_exception(detail: str = "Not found"):
    """Raise a 404 Not Found HTTP exception."""
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=detail)

def raise_forbidden_exception(detail: str = "Not authorized"):
    """Raise a 403 Forbidden HTTP exception."""
    raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail=detail)

def raise_bad_request_exception(detail: str = "Bad request"):
    """Raise a 400 Bad Request HTTP exception."""
    raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=detail)

def raise_unauthorized_exception(detail: str = "Incorrect credentials"):
    """Raise a 401 Unauthorized HTTP exception with WWW-Authenticate header."""
    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED, 
        detail=detail,
        headers={"WWW-Authenticate": "Bearer"}
    )

def raise_conflict_exception(detail: str = "Conflict occurred"):
    """Raise a 409 Conflict HTTP exception."""
    raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail=detail)
