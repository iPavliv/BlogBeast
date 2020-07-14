from flask import Blueprint
from flask_api import status
from flask_restful import Resource
from sqlalchemy import desc

from .. import API
from ..marshmallow_schemas import PostLoadSchema
from ..models import Post, Followings
from ..utils import login_required, get_pagination, get_current_user_id

NEWS_BLUEPRINT = Blueprint('news', __name__)


class NewsResource(Resource):
    @login_required
    def get(self):
        user_id = get_current_user_id()
        page, per_page = get_pagination()

        users_i_follow = Followings.query.filter(Followings.follower == user_id).all()
        users_ids = []
        for following in users_i_follow:
            users_ids.append(following.follows)

        post_list = Post.query.filter(Post.author_id.in_(users_ids)).order_by(desc(Post.post_date)).paginate(
            page=page, per_page=per_page)
        posts = PostLoadSchema(many=True).dump(post_list.items)

        response = {'posts': posts, 'pages': post_list.pages}
        return response, status.HTTP_200_OK


API.add_resource(NewsResource, '/news')
