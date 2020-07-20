import os
from datetime import datetime

from flask import g

from app_back import create_app, DB
from flask_script import Manager, Shell
from flask_migrate import Migrate, MigrateCommand

from app_back.models import User, Followings, Like, Post, Comment
from app_back.views.curr_user_data_view import CURR_USER_DATA_BLUEPRINT
from app_back.views.auth_view import AUTH_BLUEPRINT
from app_back.views.followers_view import FOLLOWER_BLUEPRINT
from app_back.views.index_view import INDEX_BLUEPRINT
from app_back.views.news_view import NEWS_BLUEPRINT
from app_back.views.post_view import POST_BLUEPRINT
from dotenv import load_dotenv

load_dotenv()

APP = create_app(os.getenv('FLASK_CONFIG'))
manager = Manager(APP)
migrate = Migrate(APP, DB)

BLUEPRINTS = (
    AUTH_BLUEPRINT, INDEX_BLUEPRINT, FOLLOWER_BLUEPRINT, POST_BLUEPRINT, CURR_USER_DATA_BLUEPRINT, NEWS_BLUEPRINT,
)
for b in BLUEPRINTS:
    APP.register_blueprint(b)


@APP.before_request
def before_request():
    g.request_start_time = datetime.now().strftime('%Y-%m-%d %H:%M:%S')


def make_shell_context():
    return dict(app=APP, db=DB, User=User, Post=Post, Followings=Followings, Like=Like, Comment=Comment)


manager.add_command('shell', Shell(make_context=make_shell_context))
manager.add_command('db', MigrateCommand)

if __name__ == '__main__':
    try:
        os.mkdir('logs')
    except OSError as e:
        print('Skip logs directory creation...')

    manager.run()
