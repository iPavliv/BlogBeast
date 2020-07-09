from functools import wraps

from flask import session, request, url_for, redirect
from flask_api import status
from flask_restful import abort
from marshmallow import ValidationError

from app_back.constants import AUTH_TOKEN_KEY


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
