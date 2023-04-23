from django.apps import AppConfig


class HotelsConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "hotels"
    #
    # def ready(self) -> None:
    #     from . import signals
