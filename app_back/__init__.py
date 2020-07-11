import logging
from datetime import datetime

from flask import Flask
from flask_jwt_extended import JWTManager
from flask_marshmallow import Marshmallow
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy

from config import config

DB = SQLAlchemy()
API = Api()
JWT = JWTManager()
MA = Marshmallow()


def create_app(config_name):
    app = Flask(__name__)

    app.config.from_object(config[config_name])
    config[config_name].init_app(app)

    logger = logging.getLogger('root')

    fh = logging.FileHandler('logs/{:%Y-%m-%d}.log'.format(datetime.now()))
    formatter = logging.Formatter('%(asctime)s  %(levelname)-8s : %(lineno)04d : %(message)s')
    fh.setFormatter(formatter)

    logger.addHandler(fh)

    DB.init_app(app)
    API.init_app(app)
    JWT.init_app(app)
    MA.init_app(app)

    return app
