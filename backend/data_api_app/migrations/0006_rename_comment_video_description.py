# Generated by Django 5.1.4 on 2024-12-12 02:03

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('data_api_app', '0005_alter_video_author_id'),
    ]

    operations = [
        migrations.RenameField(
            model_name='video',
            old_name='comment',
            new_name='description',
        ),
    ]