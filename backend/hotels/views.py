from django.db import models
from rest_framework import generics
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework import status
from sentence_transformers.models.Pooling import json

# from account_manager.permissions import UserDetailPermission
from .serializers import (
    FAQ,
    BookTemp,
    BookTempCreateSerializer,
    BookTempWithDetailSerializer,
    FAQSerializer,
    HotelCreateWithDetailsSerializer,
    HotelSerializer,
    BookingSerializer,
    HouseRules,
    HouseRulesSerializer,
    ReviewSerializer,
    Room,
    RoomSerializer,
)
from rest_framework.decorators import api_view
from .models import Hotel
from .permissions import IsPartnerPermission
from .pagination import CustomHotelSearchPagination
import pickle
from sklearn.metrics.pairwise import cosine_similarity
from sentence_transformers import SentenceTransformer
import numpy as np
from rest_framework.response import Response
from django.db.models import Q
from .models import Review


model = SentenceTransformer("all-MiniLM-L6-v2")

with open("hotels/sim_matrix.pkl", "rb") as f:
    sim_matrix = pickle.load(f)

with open("hotels/name_to_idx.pkl", "rb") as f:
    name_to_idx = pickle.load(f)

with open("hotels/idx_to_name.pkl", "rb") as f:
    idx_to_name = pickle.load(f)

with open("hotels/idx_to_embed.pkl", "rb") as f:
    idx_to_embed = pickle.load(f)


class HotelDetailApi(generics.RetrieveUpdateDestroyAPIView):
    queryset = Hotel.objects.all()
    serializer_class = HotelSerializer
    lookup_field = "id"


class HotelCreateApi(generics.CreateAPIView):
    queryset = Hotel.objects.all()
    serializer_class = HotelSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated, IsAdminUser, IsPartnerPermission]

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)


class HotelCreateWithDetailApi(generics.CreateAPIView):
    queryset = Hotel.objects.all()
    serializer_class = HotelCreateWithDetailsSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated, IsAdminUser]

    def post(self, request, *args, **kwargs):
        print(request.data)
        print(request.data.get("amenities[]"))
        # print(request.data.get("amenities"))
        # print(json.loads(request.]data["amenities"]))
        return self.create(request, *args, **kwargs)


class HotelListApi(generics.ListAPIView):
    queryset = Hotel.objects.all()
    serializer_class = HotelSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated, IsAdminUser]
    pagination_class = CustomHotelSearchPagination

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)


class HotelSearchApi(generics.ListAPIView):
    serializer_class = HotelSerializer
    authentication_classes = []
    permission_classes = []
    pagination_class = CustomHotelSearchPagination

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def get_queryset(self):
        queryset = Hotel.objects.all()
        name = self.request.query_params.get("q", None)
        if name is not None:
            queryset = queryset.filter(name__icontains=name)
        return queryset


class HotelByLocationAndNameApi(generics.ListAPIView):
    serializer_class = HotelSerializer
    authentication_classes = []
    permission_classes = []
    pagination_class = CustomHotelSearchPagination

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def get_queryset(self):
        queryset = Hotel.objects.all()
        search_query = self.request.query_params.get("term", None)
        checkInDate = self.request.query_params.get("checkInDate", None)

        checkOutDate = self.request.query_params.get("checkOutDate", None)

        people = self.request.query_params.get("people", None)
        rooms = self.request.query_params.get("rooms", None)

        if search_query is not None:
            queryset = queryset.filter(
                Q(name__icontains=search_query) | Q(address__icontains=search_query)
            )
        return queryset


class BookingCreateApi(generics.CreateAPIView):
    queryset = Hotel.objects.all()
    serializer_class = BookingSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated, IsAdminUser]


class HotelsByLocationApi(generics.ListAPIView):
    serializer_class = HotelSerializer
    authentication_classes = []
    permission_classes = []
    pagination_class = None

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def get_queryset(self):
        countries = ["France", "United Kingdom", "Netherlands", "Austria"]
        hotels = []

        for country in countries:
            country_hotels = Hotel.objects.filter(address__icontains=country)[:12]
            hotels.extend(country_hotels)

        return hotels


class ReviewByHotelApi(generics.ListAPIView):
    serializer_class = ReviewSerializer
    pagination_class = CustomHotelSearchPagination
    lookup_field = "id"

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def get_queryset(self):
        hotel_id = self.kwargs.get("id")
        return Review.objects.filter(hotel=hotel_id)


class RoomByHotelApi(generics.ListAPIView):
    serializer_class = RoomSerializer
    pagination_class = CustomHotelSearchPagination
    lookup_field = "id"

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def get_queryset(self):
        hotel_id = self.kwargs.get("id")
        return Room.objects.filter(hotel=hotel_id)


class SingleRoomByHotelApi(generics.RetrieveAPIView):
    serializer_class = RoomSerializer
    lookup_field = "id"

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def get_queryset(self):
        hotel_id = self.kwargs.get("hotel_id")
        room_id = self.kwargs.get("id")

        return Room.objects.filter(hotel=hotel_id, id=room_id)


class CreateBookingTempApi(generics.CreateAPIView):
    serializer_class = BookTempCreateSerializer
    authentication_classes = [JWTAuthentication]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(user=request.user)  # Assign the logged-in user to the booking
        headers = self.get_success_headers(serializer.data)
        return Response(
            {"message": "Temporary Booking Created"},
            status=status.HTTP_201_CREATED,
            headers=headers,
        )


class GetBookingTempApi(generics.RetrieveAPIView):
    serializer_class = BookTempWithDetailSerializer
    # permission_classes = [UserDetailPermission]
    lookup_field = "user_id"

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def get_queryset(self):
        hotel_id = self.kwargs.get("hotel_id")
        user_id = self.kwargs.get("user_id")

        return BookTemp.objects.filter(hotel=hotel_id, user=user_id)


class FAQByHotelApi(generics.ListAPIView):
    serializer_class = FAQSerializer
    pagination_class = None

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def get_queryset(self):
        hotel_id = self.kwargs.get("id")
        print(hotel_id)
        a = FAQ.objects.filter(hotel=hotel_id)
        print(a)

        return FAQ.objects.filter(hotel=hotel_id)


class HouseRulesByHotelApi(generics.RetrieveAPIView):
    serializer_class = HouseRulesSerializer
    lookup_field = "id"

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def get_queryset(self):
        hotel_id = self.kwargs.get("id")

        return HouseRules.objects.filter(hotel=hotel_id)


@api_view(["GET"])
def recommend_hotels(request):
    hotel_name = request.GET.get("hotel_name", "")

    if hotel_name not in list(name_to_idx.keys()):
        embed = model.encode(hotel_name)
        embeds = np.array(list(idx_to_embed.values()))
        sim_scores = list(enumerate(cosine_similarity(embed.reshape(1, -1), embeds)[0]))  # type: ignore
        sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
        sim_scores = sim_scores[1:11]
        hotel_indices = [i[0] for i in sim_scores]
        hotel_names = [idx_to_name[i] for i in hotel_indices]

        return Response(hotel_names)

    idx = name_to_idx[hotel_name]
    sim_scores = list(enumerate(sim_matrix[idx]))
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
    sim_scores = sim_scores[1:11]
    hotel_indices = [i[0] for i in sim_scores]
    hotel_names = [idx_to_name[i] for i in hotel_indices]
    return Response(hotel_names)
