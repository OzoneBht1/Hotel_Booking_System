# Generated by Django 4.1.7 on 2023-03-24 11:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('hotels', '0011_hotel_hotel_score'),
    ]

    operations = [
        migrations.AlterField(
            model_name='hotel',
            name='lat',
            field=models.FloatField(),
        ),
        migrations.AlterField(
            model_name='hotel',
            name='lng',
            field=models.FloatField(),
        ),
    ]