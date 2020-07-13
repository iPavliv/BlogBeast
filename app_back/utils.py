import logging
from datetime import timedelta, datetime
from functools import wraps

from flask import session, request, url_for, redirect
from flask_api import status
from flask_jwt_extended import decode_token
from flask_restful import abort
from jwt import ExpiredSignatureError
from marshmallow import ValidationError

from .constants import AUTH_TOKEN_KEY, USER_IDENTITY, PAGE, PER_PAGE, DEFAULT_PAGE, DEFAULT_PER_PAGE

LOGGER = logging.getLogger('root')


def load_data_with_schema(schema, json):
    try:
        loaded_data = schema().load(json)
    except ValidationError as err:
        LOGGER.error(err.args)
        return abort(status.HTTP_400_BAD_REQUEST)

    return loaded_data


def login_required(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        if not session.get(AUTH_TOKEN_KEY):
            return abort(status.HTTP_401_UNAUTHORIZED)
            # return redirect(url_for('signinresource', next=request.url))
        return f(*args, **kwargs)
    return wrapper


def get_current_user_id():
    access_token = session[AUTH_TOKEN_KEY]
    try:
        user_info = decode_token(access_token)
    except ExpiredSignatureError as err:
        LOGGER.error(err.args)
        return redirect(url_for('signinresource', next=request.url))

    return user_info[USER_IDENTITY]


def date_range(start_date, end_date):
    for n in range(int((end_date - start_date).days) + 1):
        yield datetime.date(start_date + timedelta(n))


def get_pagination():
    page = request.args.get(PAGE) or DEFAULT_PAGE
    per_page = request.args.get(PER_PAGE) or DEFAULT_PER_PAGE

    return page, per_page
