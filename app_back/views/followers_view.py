from flask import Blueprint, request
from flask_api import status
from flask_restful import Resource

from .. import API, DB
from ..models import Followings, User
from ..utils import login_required, get_current_user_id, get_pagination

FOLLOWER_BLUEPRINT = Blueprint('follower', __name__)


class FollowsResource(Resource):
    @login_required
    def post(self):
        user_id = get_current_user_id()
        user_to_follow = request.json['user_id']

        is_following = Followings.query.filter(Followings.follower == user_id).filter(
            Followings.follows == user_to_follow).first()

        if is_following:
            DB.session.delete(is_following)
            DB.session.commit()

            return False, status.HTTP_200_OK

        new_following = Followings(follower=user_id, follows=user_to_follow)

        DB.session.add(new_following)
        DB.session.commit()

        return True, status.HTTP_200_OK

    @login_required
    def get(self):
        user_id = get_current_user_id()
        page, per_page = get_pagination()
        who_follows = request.args['users']

        friends = []

        if who_follows == 'follows':
            friends_list = Followings.query.filter(Followings.follower == user_id).paginate(
                page=page, per_page=per_page)
            for friend in friends_list.items:
                user = User.query.filter(User.user_id == friend.follows).first()
                friends.append({'username': user.username, 'user_id': user.user_id})

        else:
            friends_list = Followings.query.filter(Followings.follows == user_id).paginate(page=page, per_page=per_page)

            for friend in friends_list.items:
                user = User.query.filter(User.user_id == friend.follower).first()
                friends.append({'username': user.username, 'user_id': user.user_id})

        response = {'friends': friends, 'pages': friends_list.pages}
        return response, status.HTTP_200_OK


class CheckFollowingResource(Resource):
    @login_required
    def get(self):
        user_id = get_current_user_id()
        user_to_check = request.args['user_id']

        is_following = Followings.query.filter(Followings.follower == user_id).filter(
            Followings.follows == user_to_check).count()

        response = bool(is_following)

        return response, status.HTTP_200_OK


API.add_resource(FollowsResource, '/followers')
API.add_resource(CheckFollowingResource, '/check_follower')
