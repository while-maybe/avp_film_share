# Generated by Django 5.1.4 on 2024-12-11 03:44

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('data_api_app', '0004_rename_author_video_author_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='video',
            name='author_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='author_videos', to=settings.AUTH_USER_MODEL),
        ),
    ]
