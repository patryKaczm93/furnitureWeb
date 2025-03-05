from fastapi import HTTPException, status 

def raise_not_found_exception(detail: str = "Not found"):
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=detail)

def raise_forbidden_exception(detail: str = "Not authorized"):
    raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail=detail)

def raise_bad_request_exception(detail: str = "Bad request"):
    raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=detail)

def raise_unauthorized_exception(detail: str = "Incorrect credentials"):
    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED, 
        detail=detail,
        headers={"WWW-Authenticate": "Bearer"})

def raise_conflict_exception(detail: str = "Conflict occured"):
    raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail=detail)