# Generated by Django 4.1.7 on 2023-05-09 11:13

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        (
            "hotels",
            "0023_remove_booking_booking_date_remove_booking_cancelled_and_more",
        ),
    ]

    operations = [
        migrations.RenameField(
            model_name="roomtemp",
            old_name="quantity",
            new_name="booked_quantity",
        ),
    ]
