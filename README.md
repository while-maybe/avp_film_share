A .env file is needed in \data_api_app 

It should contain:

```bash
SECRET_KEY = ''

DJANGO_SUPERUSER_USERNAME=''
DJANGO_SUPERUSER_PASSWORD=''
DJANGO_SUPERUSER_EMAIL=''
```

run the following command after starting the server:
```bash
python manage.py createsuperuser --noinput
```
