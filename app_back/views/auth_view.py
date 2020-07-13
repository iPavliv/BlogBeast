import logging
from datetime import datetime

from flask import session, request, Blueprint
from flask_api import status
from flask_jwt_extended import create_access_token
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError

from .. import DB, API
from ..constants import AUTH_TOKEN_KEY, AUTH_TIME
from ..models import User
from ..marshmallow_schemas import UserSignUpSchema, UserSignInSchema
from ..utils import load_data_with_schema, send_reset_email

AUTH_BLUEPRINT = Blueprint('auth', __name__)
LOGGER = logging.getLogger('root')


class SignUpResource(Resource):
    def post(self):
        new_user = load_data_with_schema(schema=UserSignUpSchema, json=request.json)
        user = User(username=new_user['username'], email=new_user['email'], password=new_user['password'])

        DB.session.add(user)

        try:
            DB.session.commit()
        except IntegrityError as err:
            LOGGER.error(err.args)
            DB.session.rollback()

            response = {'error': 'User already exists.'}
            return response, status.HTTP_400_BAD_REQUEST

        response = {'message': 'Successfully signed up.'}
        return response, status.HTTP_200_OK


class SignInResource(Resource):
    def post(self):
        user_data = load_data_with_schema(schema=UserSignInSchema, json=request.json)

        user = User.query.filter_by(email=user_data['email']).first()
        if user and user.verify_password(user_data['password']):
            access_token = create_access_token(identity=user.user_id)
            session[AUTH_TOKEN_KEY] = access_token
            session[AUTH_TIME] = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

            response = {'message': 'Successfully signed in.'}
            return response, status.HTTP_200_OK

        response = {'error': 'Invalid username or password.'}
        return response, status.HTTP_400_BAD_REQUEST


class SignOutResource(Resource):
    def post(self):
        session.clear()

        response = {'message': 'Successfully signed out.'}
        return response, status.HTTP_200_OK


class ResetPasswordResource(Resource):
    def post(self):
        user_email = request.json['email']
        user = User.query.filter_by(email=user_email).first()
        if not user:
            response_obj = {'error': 'No user with this email.'}
            return response_obj, status.HTTP_400_BAD_REQUEST

        send_reset_email(user)

        response_obj = {'message': 'Email with reset link has been sent.'}
        return response_obj, status.HTTP_200_OK

    def put(self):
        token = request.args.get('token')
        user = User.verify_reset_token(token)
        if not user:
            response_obj = {
                'error': 'Invalid or expired token.'
            }
            return response_obj, status.HTTP_400_BAD_REQUEST

        password = request.json.get('password')
        user.password = password

        DB.session.add(user)
        DB.session.commit()

        response_obj = {'message': 'Password successfully updated.'}
        return response_obj, status.HTTP_200_OK


API.add_resource(SignUpResource, '/sign_up')
API.add_resource(SignInResource, '/sign_in')
API.add_resource(SignOutResource, '/sign_out')
API.add_resource(ResetPasswordResource, '/reset_password')
