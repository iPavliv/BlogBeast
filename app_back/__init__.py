from flask import Flask
from flask_cors import CORS
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from config import config

DB = SQLAlchemy()
API = Api()


def create_app(config_name):
    app = Flask(__name__)

    app.config.from_object(config[config_name])
    config[config_name].init_app(app)

    CORS(app, supports_credentials=True)

    DB.init_app(app)
    API.init_app(app)

    return app
