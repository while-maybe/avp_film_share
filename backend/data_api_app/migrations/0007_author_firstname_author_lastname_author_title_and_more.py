# Generated by Django 5.1.4 on 2024-12-19 02:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('data_api_app', '0006_rename_comment_video_description'),
    ]

    operations = [
        migrations.AddField(
            model_name='author',
            name='firstname',
            field=models.TextField(default='firstname', max_length=50),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='author',
            name='lastname',
            field=models.TextField(default='lastname', max_length=50),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='author',
            name='title',
            field=models.TextField(default='Mr', max_length=30),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='author',
            name='about',
            field=models.TextField(blank=True, max_length=1500),
        ),
    ]
