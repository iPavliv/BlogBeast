import os
from datetime import datetime

from flask import g
from flask_cors import CORS

from app_back import create_app, DB
from flask_script import Manager, Shell
from flask_migrate import Migrate, MigrateCommand

from app_back.models import User, Followings
from app_back.views.curr_user_data_view import CURR_USER_DATA_BLUEPRINT
from app_back.views.auth_view import AUTH_BLUEPRINT
from app_back.views.followers_view import FOLLOWER_BLUEPRINT
from app_back.views.index_view import INDEX_BLUEPRINT
from app_back.views.post_view import POST_BLUEPRINT

APP = create_app(os.getenv('FLASK_CONFIG') or 'default')
manager = Manager(APP)
migrate = Migrate(APP, DB)

APP.register_blueprint(AUTH_BLUEPRINT)
APP.register_blueprint(INDEX_BLUEPRINT)
APP.register_blueprint(FOLLOWER_BLUEPRINT)
APP.register_blueprint(POST_BLUEPRINT)
APP.register_blueprint(CURR_USER_DATA_BLUEPRINT)


@APP.before_request
def before_request():
    g.request_start_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")


CORS(APP, supports_credentials=True)


def make_shell_context():
    return dict(app=APP, db=DB, User=User, Followings=Followings)


manager.add_command('shell', Shell(make_context=make_shell_context))
manager.add_command('db', MigrateCommand)

if __name__ == '__main__':
    manager.run()
