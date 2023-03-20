# Generated by Django 4.1.3 on 2023-03-10 02:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('hotels', '0002_alter_hotel_manager'),
    ]

    operations = [
        migrations.AlterField(
            model_name='booking',
            name='booking_amount',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='hotel',
            name='amenities',
            field=models.ManyToManyField(related_name='hotels', to='hotels.amenity'),
        ),
    ]
