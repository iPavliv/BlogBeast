from datetime import datetime

from flask import Blueprint, g, session, request
from flask_api import status
from flask_restful import Resource

from .. import API
from ..constants import AUTH_TIME
from ..models import Like, Post
from ..marshmallow_schemas import PostIdsSchema, LikeSchema
from ..utils import login_required, get_current_user_id, date_range

CURR_USER_DATA_BLUEPRINT = Blueprint('activity', __name__)


class ActivityResource(Resource):
    @login_required
    def get(self):
        login_time = session[AUTH_TIME]
        request_time = g.request_start_time

        response = {'last_login': login_time, 'last_request': request_time}
        return response, status.HTTP_200_OK


class StatisticsResource(Resource):
    @login_required
    def get(self):
        user_id = get_current_user_id()
        if any(k not in request.args for k in ('date_from', 'date_to')):
            date_to = date_from = datetime.today()
        else:
            date_from = datetime.strptime(request.args['date_from'], '%Y-%m-%d')
            date_to = datetime.strptime(request.args['date_to'], '%Y-%m-%d')

        posts = Post.query.filter(Post.author_id == user_id).all()
        posts_ids_data = PostIdsSchema(many=True).dump(posts)
        posts_ids = [post_id['post_id'] for post_id in posts_ids_data]

        likes_per_date = {}
        for single_date in date_range(date_from, date_to):
            likes = Like.query.filter(Like.post_id in posts_ids).filter(Like.like_date == single_date).all()
            likes_per_date[str(single_date)] = LikeSchema(many=True).dump(likes)

        return likes_per_date, status.HTTP_200_OK


API.add_resource(ActivityResource, '/activity')
API.add_resource(StatisticsResource, '/statistics')
