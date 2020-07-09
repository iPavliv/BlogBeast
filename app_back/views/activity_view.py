from flask import Blueprint, g, session
from flask_api import status
from flask_restful import Resource

from .. import API
from ..constants import AUTH_TIME
from ..utils import login_required

ACTIVITY_BLUEPRINT = Blueprint('activity', __name__)


class ActivityResource(Resource):
    @login_required
    def get(self):
        login_time = session[AUTH_TIME]
        request_time = g.request_start_time

        response = {'last_login': login_time, 'last_request': request_time}
        return response, status.HTTP_200_OK


API.add_resource(ActivityResource, '/activity')
