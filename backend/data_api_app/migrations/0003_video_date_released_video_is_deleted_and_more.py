# Generated by Django 5.1.4 on 2024-12-10 19:21

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('data_api_app', '0002_alter_author_email_alter_video_location_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='video',
            name='date_released',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='video',
            name='is_deleted',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='video',
            name='title',
            field=models.CharField(max_length=150),
        ),
    ]