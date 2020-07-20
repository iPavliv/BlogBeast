from datetime import datetime

from flask import Blueprint, request
from flask_api import status
from flask_restful import Resource
from sqlalchemy import desc

from .. import API, DB
from ..models import Post, Like, Comment
from ..marshmallow_schemas import CreatePostSchema, PostLoadSchema, CommentSchema
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
        user_id = get_current_user_id() if request.args['user_id'] == 'current' else request.args['user_id']

        if 'post_id' in request.args:
            post_by_id = Post.query.filter(Post.post_id == request.args['post_id']).first()
            post = PostLoadSchema().dump(post_by_id)

            return post, status.HTTP_200_OK

        post_list = Post.query.filter(Post.author_id == user_id).order_by(
            desc(Post.post_date)).paginate(page=page, per_page=per_page)
        posts = PostLoadSchema(many=True).dump(post_list.items)

        response = {'posts': posts, 'pages': post_list.pages}
        return response, status.HTTP_200_OK

    @login_required
    def put(self):
        post = Post.query.filter(Post.post_id == request.json['post_id']).first()
        post.post_text = request.json['post_text']

        DB.session.add(post)
        DB.session.commit()

        response = {'message': 'Post has been successfully updated.'}
        return response, status.HTTP_200_OK

    def delete(self):
        post = Post.query.filter(Post.post_id == request.json['post_id']).first()

        DB.session.delete(post)
        DB.session.commit()

        response = {'message': 'Post has been successfully deleted.'}
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


class CommentResource(Resource):
    @login_required
    def post(self):
        user_id = get_current_user_id()

        comment = Comment(
            post_id=request.json['post_id'],
            user_id=user_id,
            comment_text=request.json['comment_text'],
            comment_date=datetime.now()
        )

        DB.session.add(comment)
        DB.session.commit()

        response = {'message': 'Comment created.'}
        return response, status.HTTP_200_OK

    @login_required
    def get(self):
        page, per_page = get_pagination()

        comments_list = Comment.query.filter(Comment.post_id == request.args['post_id']).order_by(
            desc(Comment.comment_date)).paginate(page=page, per_page=per_page)
        comments = CommentSchema(many=True).dump(comments_list.items)

        response = {'comments': comments, 'pages': comments_list.pages}
        return response, status.HTTP_200_OK


API.add_resource(PostResource, '/posts')
API.add_resource(LikePostResource, '/like')
API.add_resource(CommentResource, '/comment')
