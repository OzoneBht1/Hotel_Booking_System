# Generated by Django 4.1.3 on 2022-11-23 02:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account_manager', '0002_user_is_admin'),
    ]

    operations = [
        migrations.RenameField(
            model_name='user',
            old_name='is_hotel_staff',
            new_name='is_staff',
        ),
        migrations.AlterField(
            model_name='user',
            name='is_superuser',
            field=models.BooleanField(default=False),
        ),
    ]
