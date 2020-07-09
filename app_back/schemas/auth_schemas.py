from marshmallow import fields, validates, ValidationError
from marshmallow.validate import Length, Regexp

from app_back import MA


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


class PostLoadSchema(MA.Schema):
    header = fields.Str()
    post_text = fields.Str()
    post_date = fields.Str()
    users = fields.Nested(UserInfoSchema)
