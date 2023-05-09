from django.db import models
from rest_framework import generics
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework import status
from sentence_transformers.models.Pooling import json

from rest_framework import filters
from django_filters.rest_framework import DjangoFilterBackend


# from account_manager.permissions import UserDetailPermission
from .serializers import (
    FAQ,
    BookCreateSerializer,
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
from .pagination import CustomPagination, CustomPagination
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
    permission_classes = [IsAuthenticated, IsAdminUser]

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)


class HotelCreateWithDetailApi(generics.CreateAPIView):
    queryset = Hotel.objects.all()
    serializer_class = HotelCreateWithDetailsSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated, IsAdminUser]

    def post(self, request, *args, **kwargs):
        amenities = request.POST.getlist("amenities")
        parsed_amenities = [json.loads(amenity) for amenity in amenities]
        faqs = request.POST.getlist("faqs")
        parsed_faqs = [json.loads(faq) for faq in faqs]
        house_rules = request.POST.get("house_rules")
        parsed_house_rules = {}
        if house_rules:
            parsed_house_rules = json.loads(house_rules)
        rooms = []

        for key, value in request.data.items():
            if key.startswith("rooms["):
                room_id = int(key.split(".")[0].split("[")[1].strip("]"))
                room_field = key.split(".")[1]
                if room_id >= len(rooms):
                    rooms.append({})
                rooms[room_id][room_field] = value

        #         rooms = [
        #     {
        #         "room_type": request.data.get("rooms[0].room_type"),
        #         "quantity": request.data.get("rooms[0].quantity"),
        #         "price": request.data.get("rooms[0].price"),
        #         "image": request.data.get("rooms[0].image"),
        #     }
        # ]
        # Now you have a list of dictionaries where each dictionary represents a room
        # You can then pass this list to the RoomSerializer to validate the data

        # Create a dictionary with the validated data and the parsed amenities list
        validated_data = dict(request.data)
        validated_data = {
            "name": request.data.get("name"),
            "address": request.data.get("address"),
            "house_rules": parsed_house_rules,
            "rooms": request.data.get("rooms", []),
            "amenities": parsed_amenities,
            "faqs": parsed_faqs,
            "room_count": request.data.get("room_count", None),
            "rooms": rooms,
            "hotel_image": request.data.get("hotel_image", None),
            "manager": (request.data.get("manager")),
        }

        serializer = HotelCreateWithDetailsSerializer(data=validated_data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)


class HotelListApi(generics.ListAPIView):
    queryset = Hotel.objects.all()
    serializer_class = HotelSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated, IsAdminUser]
    pagination_class = CustomPagination
    filter_backends = [
        filters.SearchFilter,
        filters.OrderingFilter,
        DjangoFilterBackend,
    ]

    filterset_fields = ["hotel_score"]
    search_fields = ["name", "address", "id", "rooms__room_type"]
    ordering_fields = ["id", "name", "hotel_score"]
    ordering = ["name"]

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)


class HotelSearchApi(generics.ListAPIView):
    serializer_class = HotelSerializer
    authentication_classes = []
    permission_classes = []
    pagination_class = CustomPagination

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def get_queryset(self):
        queryset = Hotel.objects.all()
        name = self.request.query_params.get("q", None)
        if name is not None:
            queryset = queryset.filter(name__icontains=name)
        return queryset


from django.db.models import Q


class HotelByLocationAndNameApi(generics.ListAPIView):
    serializer_class = HotelSerializer
    authentication_classes = []
    permission_classes = []
    pagination_class = CustomPagination
    filterset_fields = [
        "hotel_score",
        "cheapest_price",
        "amenities" "check_in_date",
        "check_out_date",
    ]
    ordering_fields = [
        "name",
        "hotel_score",
        "num_people",
        "num_rooms",
    ]
    search_fields = [
        "name",
        "address",
    ]

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def get_queryset(self):
        queryset = Hotel.objects.all()
        search_query = self.request.query_params.get("term", None)
        check_in_date = self.request.query_params.get("checkinDate", None)
        check_out_date = self.request.query_params.get("checkoutDate", None)
        num_people = self.request.query_params.get("people", None)
        num_rooms = self.request.query_params.get("rooms", None)
        ordering = self.request.query_params.get("ordering", None)

        if search_query:
            queryset = queryset.filter(
                Q(name__icontains=search_query) | Q(address__icontains=search_query)
            )

        if check_in_date:
            queryset = queryset.filter(check_in_date=check_in_date)

        if check_out_date:
            queryset = queryset.filter(check_out_date=check_out_date)

        if num_people:
            queryset = queryset.filter(num_people=num_people)

        if num_rooms:
            queryset = queryset.filter(num_rooms=num_rooms)

        queryset = self.filter_queryset(queryset)
        # ordering = self.get_ordering()
        if ordering:
            queryset = queryset.order_by(*ordering)

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
    pagination_class = CustomPagination
    lookup_field = "id"

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def get_queryset(self):
        hotel_id = self.kwargs.get("id")
        return Review.objects.filter(hotel=hotel_id)


class RoomByHotelApi(generics.ListAPIView):
    serializer_class = RoomSerializer
    pagination_class = CustomPagination
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

    def get_serializer_class(self):
        if self.request.method == "GET":
            return BookTempWithDetailSerializer
        return self.serializer_class

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def get_queryset(self):
        hotel_id = self.kwargs.get("hotel_id")
        user_id = self.kwargs.get("user_id")

        return BookTemp.objects.filter(hotel=hotel_id, user=user_id)


class CreateBooking(generics.CreateAPIView):
    serializer_class = BookCreateSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

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
