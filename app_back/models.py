from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship, backref
from werkzeug.security import generate_password_hash, check_password_hash

from app_back import DB


class User(DB.Model):
    __tablename__ = 'users'
    user_id = DB.Column(DB.Integer, primary_key=True)
    username = DB.Column(DB.String(64), unique=True, index=True)
    email = DB.Column(DB.String(64), unique=True, index=True)
    password_hash = DB.Column(DB.String(128))

    @property
    def password(self):
        raise AttributeError('Password is not a readable attribute.')

    @password.setter
    def password(self, password):
        self.password_hash = generate_password_hash(password)

    def verify_password(self, password):
        return check_password_hash(self.password_hash, password)


class Followings(DB.Model):
    __tablename__ = 'followings'
    followings_id = DB.Column(DB.Integer, primary_key=True)
    follower = DB.Column(DB.Integer, ForeignKey('users.user_id'))
    follows = DB.Column(DB.Integer, ForeignKey('users.user_id'))
