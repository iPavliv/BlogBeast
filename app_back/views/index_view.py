from flask import Blueprint
from flask_api import status
from flask_restful import Resource

from .. import API

INDEX_BLUEPRINT = Blueprint('index', __name__)


class IndexResource(Resource):
    def get(self):
        response = {'message': 'Authorized'}
        return response, status.HTTP_200_OK


API.add_resource(IndexResource, '/')
