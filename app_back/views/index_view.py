from flask import Blueprint
from flask_api import status
from flask_restful import Resource
from sqlalchemy import desc

from .. import API
from ..marshmallow_schemas import PostLoadSchema
from ..models import Post
from ..utils import login_required, get_pagination

INDEX_BLUEPRINT = Blueprint('index', __name__)


class IndexResource(Resource):
    @login_required
    def get(self):
        page, per_page = get_pagination()

        post_list = Post.query.filter().order_by(desc(Post.post_date)).paginate(page=page, per_page=per_page)
        posts = PostLoadSchema(many=True).dump(post_list.items)

        return posts, status.HTTP_200_OK


API.add_resource(IndexResource, '/')
