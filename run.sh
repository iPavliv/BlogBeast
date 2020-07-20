apt update -y && apt install -y python3 python3-dev python3-pip libssl-dev libffi-dev
python3 -m venv env
env/bin/activate
pip install -r requirements.txt
python manage.py db upgrade
python manage.py runserver
