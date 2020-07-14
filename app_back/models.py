from flask import current_app
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship
from werkzeug.security import generate_password_hash, check_password_hash
from itsdangerous import SignatureExpired, TimedJSONWebSignatureSerializer as Serializer, BadSignature

from app_back import DB


class User(DB.Model):
    __tablename__ = 'users'
    user_id = DB.Column(DB.Integer, primary_key=True)
    username = DB.Column(DB.String(64), unique=True, index=True)
    email = DB.Column(DB.String(64), unique=True, index=True)
    password_hash = DB.Column(DB.String(128))

    posts = relationship('Post', backref='users', lazy='dynamic')
    likes = relationship('Like', backref='users', lazy='dynamic')
    comments = relationship('Comment', backref='users', lazy='dynamic')

    @property
    def password(self):
        raise AttributeError('Password is not a readable attribute.')

    @password.setter
    def password(self, password):
        self.password_hash = generate_password_hash(password)

    def verify_password(self, password):
        return check_password_hash(self.password_hash, password)

    def get_reset_token(self, expires_sec=7200):
        serial = Serializer(current_app.config.get('SECRET_KEY'), expires_sec)
        return serial.dumps({'user_id': self.user_id}).decode('utf-8')

    @staticmethod
    def verify_reset_token(token):
        serial = Serializer(current_app.config.get('SECRET_KEY'))

        try:
            user_id = serial.loads(token)['user_id']
        except (BadSignature, SignatureExpired):
            return None

        return User.query.get(user_id)


class Followings(DB.Model):
    __tablename__ = 'followings'
    followings_id = DB.Column(DB.Integer, primary_key=True)
    follower = DB.Column(DB.Integer, ForeignKey('users.user_id'))
    follows = DB.Column(DB.Integer, ForeignKey('users.user_id'))


class Post(DB.Model):
    __tablename__ = 'posts'
    post_id = DB.Column(DB.Integer, primary_key=True)
    header = DB.Column(DB.String(128))
    post_text = DB.Column(DB.Text)
    author_id = DB.Column(DB.Integer, ForeignKey('users.user_id'))
    post_date = DB.Column(DB.DateTime)

    likes = relationship('Like', backref='posts', cascade="all,delete", lazy='dynamic')
    comments = relationship('Comment', backref='posts', cascade="all,delete", lazy='dynamic')


class Like(DB.Model):
    __tablename__ = 'likes'
    like_id = DB.Column(DB.Integer, primary_key=True)
    post_id = DB.Column(DB.Integer, ForeignKey('posts.post_id'))
    user_id = DB.Column(DB.Integer, ForeignKey('users.user_id'))
    like_date = DB.Column(DB.Date)


class Comment(DB.Model):
    __tablename__ = 'comments'
    comment_id = DB.Column(DB.Integer, primary_key=True)
    post_id = DB.Column(DB.Integer, ForeignKey('posts.post_id'))
    user_id = DB.Column(DB.Integer, ForeignKey('users.user_id'))
    comment_text = DB.Column(DB.Text)
    comment_date = DB.Column(DB.DateTime)
