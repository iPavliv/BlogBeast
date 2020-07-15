# BlogBeast

## Description
This is the source code of BlogBeast app, social network.
Share your mind, discuss your interests with other people, get a lot of content.

## Technologies
* Python (3.8.1)
* Flask (1.1.2)
* React (16.13.1)


## Start app:
To run back-end:
```
python -m venv env
env\scripts\activate or env/bin/activate
pip install -r requirements.txt

python manage.py db init
python manage.py db upgrade
python manage.py runserver
```
To run front-end, you need to install npm first. Then, in app_front directory:
```
npm install
npm start
```
