from datetime import timedelta, datetime
from functools import wraps

from flask import session, request, url_for, redirect
from flask_api import status
from flask_jwt_extended import decode_token
from flask_restful import abort
from marshmallow import ValidationError

from app_back.constants import AUTH_TOKEN_KEY, USER_IDENTITY


def load_data_with_schema(schema, json):
    try:
        loaded_data = schema().load(json)
    except ValidationError as err:
        # APP.logger.error(err.args, err.messages)
        return abort(status.HTTP_400_BAD_REQUEST)

    return loaded_data


def login_required(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        if not session.get(AUTH_TOKEN_KEY):
            return redirect(url_for('signinresource', next=request.url))
        return f(*args, **kwargs)
    return wrapper


def get_current_user_id():
    access_token = session[AUTH_TOKEN_KEY]
    user_info = decode_token(access_token)
    return user_info[USER_IDENTITY]


def date_range(start_date, end_date):
    for n in range(int((end_date - start_date).days) + 1):
        yield datetime.date(start_date + timedelta(n))
