# Generated by Django 4.1.7 on 2023-05-17 08:46

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("hotels", "0032_remove_booking_booking_status"),
    ]

    operations = [
        migrations.AddField(
            model_name="hotel",
            name="approved",
            field=models.BooleanField(default=False),
        ),
    ]