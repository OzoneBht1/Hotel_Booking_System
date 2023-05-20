from io import BytesIO
from django.db import models
from django.http.response import JsonResponse
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework import status
from sentence_transformers.models.Pooling import json

from rest_framework import filters
from django_filters.rest_framework import DjangoFilterBackend

from account_manager.permissions import UserDetailPermission
from django.core.serializers import serialize
import json
from io import BytesIO
from datetime import datetime

from django.http import HttpResponse, JsonResponse
from django.core.mail import EmailMessage
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User  # Or import your custom User model if you have one


from reportlab.pdfgen import canvas
from rest_framework.decorators import api_view


# from account_manager.permissions import UserDetailPermission
from .serializers import (
    FAQ,
    BookCreateSerializer,
    BookTemp,
    BookTempCreateSerializer,
    BookTempWithDetailSerializer,
    Booking,
    BookingSerializer,
    FAQSerializer,
    HistorySerializer,
    HotelCreateWithDetailsSerializer,
    HotelSerializer,
    HouseRules,
    HouseRulesSerializer,
    ReviewSerializer,
    Room,
    RoomSerializer,
    User,
)
from rest_framework.decorators import api_view
from .models import History, Hotel
from .permissions import CanLeaveReview, IsCurrentUserPermission, datetime
from .pagination import CustomPagination, CustomPagination
import pickle
from sklearn.metrics.pairwise import cosine_similarity
from sentence_transformers import SentenceTransformer
import numpy as np
from rest_framework.response import Response
from django.db.models import Q, Count, Min
from .models import Review
from django.db.models import DateTimeField
from django.db.models.functions import TruncDate
from django.utils import timezone
from django.db.models.functions import Cast
from django.db.models import DateField

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

    filterset_fields = ["hotel_score"]
    search_fields = ["name", "address", "id", "rooms__room_type"]
    ordering_fields = ["id", "name", "hotel_score"]
    ordering = ["name"]


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
    # permission_classes = [IsAuthenticated, IsAdminUser]
    permission_classes = [IsAuthenticated]

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
    queryset = Hotel.objects.filter(approved=True)
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


class UnApprovedHotelsApi(generics.ListAPIView):
    queryset = Hotel.objects.filter(approved=False)
    serializer_class = HotelSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAdminUser]
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
    filterset_fields = ["hotel_score"]
    ordering_fields = [
        "name",
        "hotel_score",
        "cheapest_price",
    ]
    search_fields = [
        "name",
        "address",
    ]

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def get_queryset(self):
        queryset = Hotel.objects.filter(approved=True)
        search_query = self.request.query_params.get("term", None)
        ordering = self.request.query_params.get("ordering", None)
        min_price = self.request.query_params.get("min_price", None)
        max_price = self.request.query_params.get("max_price", None)
        check_in = self.request.query_params.get("check_in", None)
        check_out = self.request.query_params.get("check_out", None)
        min_score = self.request.query_params.get("min_score", None)
        max_score = self.request.query_params.get("max_score", None)
        room_count = self.request.query_params.get("room_count", None)

        if search_query:
            queryset = queryset.filter(
                Q(name__icontains=search_query) | Q(address__icontains=search_query)
            )

        queryset = self.filter_queryset(queryset)

        # if min_price and max_price:
        # queryset = queryset.filter(rooms__price__range=(min_price, max_price))
        #
        if min_score and max_score:
            queryset = queryset.filter(hotel_score__range=(min_score, max_score))

        if ordering:
            if ordering == "cheapest_price":
                # Order by cheapest price
                queryset = queryset.annotate(
                    cheapest_price=Min("rooms__price")
                ).order_by("cheapest_price")
            else:
                # Order by other fields
                queryset = queryset.order_by(ordering)

        if room_count:
            queryset = queryset.filter(room_count__gte=room_count)

        return queryset


class BookingCreateApi(generics.CreateAPIView):
    queryset = Hotel.objects.all()
    serializer_class = BookCreateSerializer
    authentication_classes = [JWTAuthentication]
    # permission_classes = [IsAuthenticated, IsAdminUser]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        booking = serializer.save(
            user=request.user
        )  # Assign the logged-in user to the booking
        headers = self.get_success_headers(serializer.data)
        update_available_rooms(request.data)
        return Response(
            {"message": "Temporary Booking Created"},
            status=status.HTTP_201_CREATED,
            headers=headers,
        )


def update_available_rooms(booking):
    print("booking", booking)
    for rooms in booking["rooms"]:
        room_id = rooms["room"]
        room_obj = Room.objects.get(id=room_id)
        room_obj.quantity -= rooms["quantity"]
        room_obj.save()


class BookingDetailsByUserApi(generics.ListAPIView):
    serializer_class = BookingSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsCurrentUserPermission]
    pagination_class = CustomPagination
    filter_backends = [
        filters.SearchFilter,
        filters.OrderingFilter,
        DjangoFilterBackend,
    ]

    search_fields = ["hotel__name"]
    ordering = ["hotel__name"]

    def get_queryset(self):
        user = self.kwargs["user_id"]
        queryset = Booking.objects.filter(user=user)
        return queryset


class LatestBookingView(generics.RetrieveAPIView):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    permission_classes = [IsAdminUser]

    def get_object(self):
        return Booking.objects.latest("updated_at")


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


class CheckPermissionAPIView(APIView):
    permission_classes = [CanLeaveReview]

    def get(self, request, hotel_id, user_id):
        has_permission = all(
            perm.has_permission(request, self) for perm in self.get_permissions()
        )

        return Response({"hasPermission": has_permission}, status=status.HTTP_200_OK)


class ReviewCreateApi(generics.CreateAPIView):
    serializer_class = ReviewSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated, CanLeaveReview]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        hotel = self.kwargs["hotel_id"]
        user = self.kwargs["user_id"]
        serializer.is_valid(raise_exception=True)
        serializer.save(user=user, hotel=hotel)
        headers = self.get_success_headers(serializer.data)
        return Response(
            {"message": "Review Created"},
            status=status.HTTP_201_CREATED,
            headers=headers,
        )


class ReviewsOfAUserApi(generics.ListAPIView):
    serializer_class = ReviewSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsCurrentUserPermission]

    pagination_class = None

    def get_queryset(self):
        user = self.kwargs["user_id"]
        hotel = self.kwargs["hotel_id"]
        queryset = Review.objects.filter(user=user, hotel=hotel)
        return queryset


class ReviewsNotByUser(generics.ListAPIView):
    serializer_class = ReviewSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsCurrentUserPermission]
    pagination_class = None

    def get_queryset(self):
        user = self.kwargs["user_id"]
        hotel = self.kwargs["hotel_id"]
        queryset = Review.objects.filter(hotel=hotel).exclude(user=user)

        return queryset


class CreateReviewApi(generics.CreateAPIView):
    serializer_class = ReviewSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated, CanLeaveReview]


class ModifyReviewApi(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ReviewSerializer
    lookup_field = "id"
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated, IsCurrentUserPermission]


class ReviewByHotelApi(generics.ListAPIView):
    serializer_class = ReviewSerializer
    pagination_class = CustomPagination
    lookup_field = "id"

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def get_queryset(self):
        hotel_id = self.kwargs.get("id")
        return Review.objects.filter(hotel=hotel_id)


# class CreateReviewApi(generics.CreateAPIView):


class GetAllBookingApi(generics.ListAPIView):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    permission_classes = [IsAdminUser]
    pagination_class = CustomPagination
    filter_backends = [
        filters.SearchFilter,
        filters.OrderingFilter,
        DjangoFilterBackend,
    ]

    search_fields = ["hotel__name"]
    # ordering_fields = ["id", "name", "hotel_score"]
    # ordering = ["name"]

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)


class GetAllBookingToday(generics.ListAPIView):
    serializer_class = BookingSerializer
    permission_classes = [IsAdminUser]
    pagination_class = None

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def get_queryset(self):
        # Get today's date in the current timezone
        today = timezone.localdate()
        print(today)

        current_date_utc = timezone.make_aware(
            timezone.datetime.combine(today, timezone.datetime.min.time())  # type: ignore
        )
        print(current_date_utc.date())
        print(Booking.objects.latest("updated_at").updated_at.date())

        # Filter bookings for today
        queryset = Booking.objects.filter(created_at__date=current_date_utc.date())

        return queryset


class GetBookingApi(generics.RetrieveAPIView):
    serializer_class = BookingSerializer
    lookup_field = "hotel_id"

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def get_queryset(self):
        hotel_id = self.kwargs.get("hotel_id")
        user_id = self.kwargs.get("user_id")
        return Booking.objects.filter(hotel=hotel_id, user=user_id)


# class ReviewApi(generics.RetrieveUpdateDestroyAPIView)


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


@api_view(["GET"])
def get_next_available_date(request, room_id):
    now = datetime.now().date()
    bookings = Booking.objects.filter(rooms__room=room_id, check_out__gte=now).order_by(
        "check_out"
    )
    print(bookings)
    earliest_booking = bookings.first()
    if earliest_booking is not None:
        earliest_check_out_date = earliest_booking.check_out
        return Response(
            {"earliest": earliest_check_out_date}, status=status.HTTP_200_OK
        )

    return Response({"earliest": None}, status=status.HTTP_200_OK)


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


class DeleteTempBookingApi(generics.DestroyAPIView):
    serializer_class = BookTempWithDetailSerializer
    lookup_field = "user_id"
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

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


from rest_framework import serializers


class CreateHistoryApi(generics.CreateAPIView):
    queryset = History.objects.all()
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        # Get the hotel_id from the request data
        hotel_id = request.data.get("hotel")

        # Retrieve the hotel instance using the hotel_id
        try:
            hotel = Hotel.objects.get(id=hotel_id)
        except Hotel.DoesNotExist:
            raise serializers.ValidationError("Invalid hotel ID.")

        # Check if a history entry already exists for the current user
        user_history = History.objects.filter(user=request.user).first()

        if user_history:
            # Update the existing history entry with the new hotel instance
            user_history.hotel = hotel
            user_history.save()
        else:
            # Create a new history entry
            History.objects.create(user=request.user, hotel=hotel)

        return Response("History updated successfully.")

from reportlab.lib.pagesizes import letter

def generate_pdf(request, user_id):
    # Retrieve the user from the database based on the user_id parameter
    user = User.objects.get(id=user_id)

    # Generate the PDF file using ReportLab
    buffer = BytesIO()
    pdf_canvas = canvas.Canvas(buffer, pagesize=letter)

    # Set font sizes and positions for different elements
    title_size = 20
    title_pos = 300
    content_size = 12
    content_pos = 650
    line_space = 20

    # Draw the title
    pdf_canvas.setFontSize(title_size)
    pdf_canvas.drawCentredString(title_pos, 700, 'Hotel Contract')

    # Draw the user information
    pdf_canvas.setFontSize(content_size)
    pdf_canvas.drawString(50, content_pos, f'Customer Name: {user.first_name} {user.last_name}')
    pdf_canvas.drawString(50, content_pos - line_space, f'Email: {user.email}')
    pdf_canvas.setFontSize(content_size)
    contract_content = [
        'Contract Clause 1: Reservation Details',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        '',
        'Contract Clause 2: Payment Terms',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        '',
        'Contract Clause 3: Cancellation Policy',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        '',
        'Contract Clause 4: Additional Terms and Conditions',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        'Contract Clause 5: Additional Terms and Conditions',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        'Contract Clause 6: Additional Terms and Conditions',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    ]
    contract_pos = content_pos - line_space * 4

    for line in contract_content:
        pdf_canvas.drawString(50, contract_pos, line)
        contract_pos -= line_space

    signature_pos = contract_pos - line_space * 3
    pdf_canvas.setFontSize(content_size)
    pdf_canvas.drawString(50, signature_pos, 'Signature:')
    pdf_canvas.line(120, signature_pos - 12, 300, signature_pos - 12)


    # Add more contract content as needed
    # ...

    # Close the PDF object cleanly, and we're done.
    pdf_canvas.showPage()
    pdf_canvas.save()

    return HttpResponse(buffer.getvalue(), content_type='application/pdf')

@api_view(['GET'])
def download_pdf(request, user_id):
    pdf_response = generate_pdf(request, user_id)

    return pdf_response

@csrf_exempt
@api_view(['POST'])
def send_contract(request):
    email = request.data.get("email")
    user_id = User.objects.get(email = email).id
    pdf = generate_pdf(request, user_id)

    print(email)
    msg = EmailMessage(
        f'Hotel Contract',
        'Please find the attached contract and send it to ozonebhattarai@gmail.com with your signature',
        'ozonebhattarai@gmail.com',
        [email]
    )
    msg.attach(f'contract_{user_id}.pdf', pdf.getvalue(), 'application/pdf')
    msg.send()

    return JsonResponse({'success': True})

@api_view(["POST"])
def recommend_hotels(request):
    user_id = request.data.get("user_id", None)
    history = None

    if user_id:
        history = History.objects.get(user=user_id)
        print(history)
    if not history:
        top_hotels = (
            Booking.objects.values("hotel")
            .annotate(total_bookings=Count("hotel"))
            .order_by("-total_bookings")[:5]
        )
        hotel_ids = [item["hotel"] for item in top_hotels]
        hotels = Hotel.objects.filter(id__in=hotel_ids)

        serializer = HotelSerializer(hotels, many=True)
        serialized_data = serializer.data

        return JsonResponse(serialized_data, safe=False)

    hotel_id = history.hotel.id

    hotel_name = Hotel.objects.get(id=hotel_id).name

    if hotel_name not in list(name_to_idx.keys()):
        embed = model.encode(hotel_name)
        embeds = np.array(list(idx_to_embed.values()))
        sim_scores = list(enumerate(cosine_similarity(embed.reshape(1, -1), embeds)[0]))  # type: ignore
        sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
        sim_scores = sim_scores[1:11]
        hotel_indices = [i[0] for i in sim_scores]
        hotel_names = [idx_to_name[i] for i in hotel_indices]
        hotels = Hotel.objects.filter(name__in=hotel_names)

    else:
        idx = name_to_idx[hotel_name]
        sim_scores = list(enumerate(sim_matrix[idx]))
        sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
        sim_scores = sim_scores[1:11]
        hotel_indices = [i[0] for i in sim_scores]
        hotel_names = [idx_to_name[i] for i in hotel_indices]
        hotels = Hotel.objects.filter(name__in=hotel_names)

    serializer = HotelSerializer(hotels, many=True)
    serialized_data = serializer.data

    return JsonResponse(serialized_data, safe=False)
