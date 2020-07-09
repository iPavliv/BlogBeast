import os

BASEDIR = os.path.abspath(os.path.dirname(__file__))


class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_TOKEN_LOCATION = ['cookies']
    JWT_COOKIE_CSRF_PROTECT = True
    JWT_ACCESS_TOKEN_EXPIRES = 86400  # 7200
    JWT_SESSION_COOKIE = False
    JWT_COOKIE_SECURE = True

    @staticmethod
    def init_app(app):
        pass


class DevelopmentConfig(Config):
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = (os.environ.get('DATABASE_URL') or
                               f'sqlite:///{os.path.join(BASEDIR, "social-network-dev.sqlite")}')


config = {
    'development': DevelopmentConfig,
    'default': DevelopmentConfig
}
