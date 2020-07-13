from datetime import datetime

from flask import Blueprint, request
from flask_api import status
from flask_restful import Resource
from sqlalchemy import desc

from .. import API, DB
from ..models import Post, Like
from ..marshmallow_schemas import CreatePostSchema, PostLoadSchema
from ..utils import login_required, get_current_user_id, load_data_with_schema, get_pagination

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
        page, per_page = get_pagination()

        if 'post_id' in request.args:
            post_by_id = Post.query.filter(Post.post_id == request.args['post_id']).first()
            post = PostLoadSchema().dump(post_by_id)

            return post, status.HTTP_200_OK

        post_list = Post.query.filter(Post.author_id == request.args['user_id']).order_by(
            desc(Post.post_date)).paginate(page=page, per_page=per_page)
        posts = PostLoadSchema(many=True).dump(post_list.items)

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


class LikePostResource(Resource):
    @login_required
    def post(self):
        user_id = get_current_user_id()

        is_liked = Like.query.filter(Like.post_id == request.json['post_id']).filter(Like.user_id == user_id).first()
        if is_liked:
            DB.session.delete(is_liked)
            DB.session.commit()

            response = {'message': 'Unlike.'}
            return response, status.HTTP_200_OK

        like = Like(post_id=request.json['post_id'], user_id=user_id, like_date=datetime.date(datetime.today()))

        DB.session.add(like)
        DB.session.commit()

        response = {'message': 'Like.'}
        return response, status.HTTP_200_OK

    @login_required
    def get(self):
        like = Like.query.filter(Like.post_id == request.args['post_id']).count()

        return like, status.HTTP_200_OK


class MyPageResource(Resource):
    @login_required
    def get(self):
        user_id = get_current_user_id()
        page, per_page = get_pagination()

        if 'post_id' in request.args:
            post_by_id = Post.query.filter(Post.post_id == request.args['post_id']).first()
            post = PostLoadSchema().dump(post_by_id)

            return post, status.HTTP_200_OK

        post_list = Post.query.filter(Post.author_id == request.args['user_id']).order_by(
            desc(Post.post_date)).paginate(page=page, per_page=per_page)
        posts = PostLoadSchema(many=True).dump(post_list.items)

        return posts, status.HTTP_200_OK


API.add_resource(PostResource, '/posts')
API.add_resource(LikePostResource, '/like')
