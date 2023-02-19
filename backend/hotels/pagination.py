from rest_framework.pagination import LimitOffsetPagination

class CustomHotelSearchPagination(LimitOffsetPagination):
    default_limit = 7
    max_limit = 30
    