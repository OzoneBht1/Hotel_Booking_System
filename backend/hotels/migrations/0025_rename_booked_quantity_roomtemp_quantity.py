# Generated by Django 4.1.7 on 2023-05-09 13:10

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("hotels", "0024_rename_quantity_roomtemp_booked_quantity"),
    ]

    operations = [
        migrations.RenameField(
            model_name="roomtemp",
            old_name="booked_quantity",
            new_name="quantity",
        ),
    ]
