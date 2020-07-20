import logging
import os
from datetime import timedelta, datetime
from functools import wraps

from flask import session, request
from flask_api import status
from flask_jwt_extended import decode_token
from flask_mail import Message
from flask_restful import abort
from jwt import ExpiredSignatureError
from marshmallow import ValidationError

from . import MAIL
from .constants import AUTH_TOKEN_KEY, USER_IDENTITY, PAGE, PER_PAGE, DEFAULT_PAGE, DEFAULT_PER_PAGE

LOGGER = logging.getLogger('root')

FRONT_END_APP = os.environ.get('FRONT_END_APP')


def abort_and_log(msg, code):
    LOGGER.error(msg)
    abort(code)


def load_data_with_schema(schema, json):
    try:
        loaded_data = schema().load(json)
    except ValidationError as err:
        abort_and_log(msg=err.args, code=status.HTTP_400_BAD_REQUEST)

    return loaded_data


def login_required(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        if not session.get(AUTH_TOKEN_KEY):
            abort_and_log(msg="Not authorized", code=status.HTTP_401_UNAUTHORIZED)
        return f(*args, **kwargs)
    return wrapper


def get_current_user_id():
    access_token = session[AUTH_TOKEN_KEY]
    try:
        user_info = decode_token(access_token)
    except ExpiredSignatureError as err:
        abort_and_log(msg=err.args, code=status.HTTP_401_UNAUTHORIZED)

    return user_info[USER_IDENTITY]


def date_range(start_date, end_date):
    for n in range(int((end_date - start_date).days) + 1):
        yield datetime.date(start_date + timedelta(n))


def get_pagination():
    page = int(request.args.get(PAGE) or DEFAULT_PAGE)
    per_page = int(request.args.get(PER_PAGE) or DEFAULT_PER_PAGE)

    return page, per_page


def send_reset_email(user):
    """Send email with reset password token."""
    token = user.get_reset_token()
    message = Message('Password Reset Request',
                      sender='no-reply@BlogBeast',
                      recipients=[user.email])
    url_to = f'{FRONT_END_APP}/set_new_password?token={token}'
    message.body = f'''
        To reset your password visit the following link:
            {url_to}
        If you did not make this request just ignore this email and no changes will be done.
    '''
    MAIL.send(message)
