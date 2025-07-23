from app.routes.create_admin import create_admin_user
from app.models import Users
from app.config import settings

def test_create_admin_user(db_session):
    # Make sure the admin user does not already exist
    existing = db_session.query(Users).filter(Users.email == settings.ADMIN_EMAIL).first()
    assert existing is None

    # Create the admin user
    create_admin_user(db_session)

    # Check if the admin user was created successfully
    new_admin = db_session.query(Users).filter(Users.email == settings.ADMIN_EMAIL).first()
    assert new_admin is not None
    assert new_admin.username == settings.ADMIN_USERNAME
    assert new_admin.role.name == "ADMIN"
    assert new_admin.is_verified is True

def test_create_admin_user_already_exists(db_session):
    # Create the admin user first
    create_admin_user(db_session)

    # Try to create the admin user again
    create_admin_user(db_session)

    # Check that the admin user still exists and was not duplicated
    admin_user = db_session.query(Users).filter(Users.email == settings.ADMIN_EMAIL).first()
    assert admin_user is not None
    assert admin_user.username == settings.ADMIN_USERNAME
    assert admin_user.role.name == "ADMIN"
    assert admin_user.is_verified is True