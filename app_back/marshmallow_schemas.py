from marshmallow import fields, validates, ValidationError, post_dump
from marshmallow.validate import Length, Regexp

from . import MA
from .utils import get_current_user_id


class UserSignUpSchema(MA.Schema):
    username = fields.Str(
        required=True,
        validate=[
            Length(max=64),
            Regexp('^[A-Za-z][A-Za-z0-9._]*$', error='Username must have only letters, numbers, dots or underscores.'),
        ]
    )
    email = fields.Email(required=True)
    password = fields.Str(required=True)
    password2 = fields.Str(required=True)

    @validates
    def check_password(self, **kwargs):
        if kwargs['password'] != kwargs['password2']:
            raise ValidationError(message='Passwords must match.')


class UserSignInSchema(MA.Schema):
    email = fields.Email(required=True)
    password = fields.Str(required=True)


class CreatePostSchema(MA.Schema):
    header = fields.Str(required=True, validate=Length(max=128))
    post_text = fields.Str(required=True)


class UserInfoSchema(MA.Schema):
    user_id = fields.Integer()
    username = fields.Str()


class LikeCountSchema(MA.Schema):
    like_id = fields.Integer()
    user_id = fields.Integer()
    #user = fields.Nested(UserInfoSchema)


class PostLoadSchema(MA.Schema):
    post_id = fields.Integer()
    header = fields.Str()
    post_text = fields.Str()
    post_date = fields.DateTime('%Y-%m-%d %H:%M')
    users = fields.Nested(UserInfoSchema)
    likes = fields.Nested(LikeCountSchema, many=True)

    @post_dump
    def like_info(self, data, **kwargs):
        data['like_count'] = len(data['likes'])

        user_likes = [like['user_id'] for like in data['likes']]
        curr_user = get_current_user_id()

        data['liked_by_curr_user'] = False
        if curr_user in user_likes:
            data['liked_by_curr_user'] = True

        return data


class PostGeneralSchema(MA.Schema):
    post_id = fields.Integer()
    header = fields.Str()


class LikeSchema(MA.Schema):
    like_id = fields.Integer()
    users = fields.Nested(UserInfoSchema)
    posts = fields.Nested(PostGeneralSchema)
