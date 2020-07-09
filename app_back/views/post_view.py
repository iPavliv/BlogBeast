from datetime import datetime

from flask import Blueprint, request
from flask_api import status
from flask_restful import Resource
from sqlalchemy import desc

from .. import API, DB
from ..models import Post
from ..schemas.auth_schemas import CreatePostSchema, PostLoadSchema
from ..utils import login_required, get_current_user_id, load_data_with_schema

POST_BLUEPRINT = Blueprint('post', __name__)


class PostResource(Resource):
    @login_required
    def post(self):
        user_id = get_current_user_id()

        new_post = load_data_with_schema(schema=CreatePostSchema, json=request.json)
        post = Post(
            header=new_post['header'], post_text=new_post['post_text'], post_date=datetime.now(), author_id=user_id
        )

        DB.session.add(post)
        DB.session.commit()

        response = {'message': 'Post created.'}
        return response, status.HTTP_200_OK

    @login_required
    def get(self):
        post_list = Post.query.filter(Post.author_id == request.json['user_id']).order_by(
            desc(Post.post_date)).limit(15)
        posts = PostLoadSchema(many=True).dump(post_list)

        return posts, status.HTTP_200_OK

    @login_required
    def put(self):
        user_id = get_current_user_id()

        post = Post.query.filter(Post.author_id == user_id).filter(Post.post_id == request.json['post_id']).first()
        post.post_text = request.json['post_text']

        DB.session.add(post)
        DB.session.commit()

        response = {'message': 'Post updated.'}
        return response, status.HTTP_200_OK


API.add_resource(PostResource, '/posts')
