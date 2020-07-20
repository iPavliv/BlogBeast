python -m venv env
CALL env\scripts\activate
pip install -r requirements.txt
python manage.py db upgrade
python manage.py runserver
