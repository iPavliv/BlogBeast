from flask import Blueprint, request
from flask_api import status
from flask_restful import Resource

from .. import API, DB
from ..models import Followings, User
from ..utils import login_required, get_current_user_id

FOLLOWER_BLUEPRINT = Blueprint('follower', __name__)


class FollowsResource(Resource):
    @login_required
    def post(self):
        user_id = get_current_user_id()
        user_to_follow = request.json['user_id']

        is_following = Followings.query.filter(Followings.follower == user_id).filter(
            Followings.follows == user_to_follow).first()
        if not is_following:
            new_following = Followings(follower=user_id, follows=user_to_follow)

            DB.session.add(new_following)
            DB.session.commit()

        response = {'message': 'Following'}
        return response, status.HTTP_200_OK

    @login_required
    def get(self):
        user_id = get_current_user_id()

        friends_list = Followings.query.filter(Followings.follower == user_id).limit(15)
        friends = []
        for friend in friends_list:
            user = User.query.filter(User.user_id == friend.follows)
            friends.append({'username': user[0].username, 'user_id': user[0].user_id})

        return friends, status.HTTP_200_OK


class FollowerResource(Resource):
    @login_required
    def get(self):
        user_id = get_current_user_id()

        friends_list = Followings.query.filter(Followings.follows == user_id).limit(15)
        friends = []
        for friend in friends_list:
            user = User.query.filter(User.user_id == friend.follows)
            friends.append({'username': user[0].username, 'user_id': user[0].user_id})

        return friends, status.HTTP_200_OK


API.add_resource(FollowsResource, '/i_follow')
API.add_resource(FollowerResource, '/followers')
