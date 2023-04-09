from rest_framework import generics
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from .serializers import HotelSerializer, BookingSerializer, HomepageHotelSerializer
from rest_framework.decorators import api_view
from .models import Hotel
from .permissions import IsPartnerPermission
from .pagination import CustomHotelSearchPagination
import pickle
from sklearn.metrics.pairwise import cosine_similarity
from sentence_transformers import SentenceTransformer
import numpy as np

# Create your views here.
from rest_framework.response import Response
from django.db.models import Value, CharField


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

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)


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


class BookingCreateApi(generics.CreateAPIView):
    queryset = Hotel.objects.all()
    serializer_class = BookingSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated, IsAdminUser]


class HotelsByLocationApi(generics.ListAPIView):
    serializer_class = HomepageHotelSerializer
    authentication_classes = []
    permission_classes = []
    # pagination_class = CustomHotelSearchPagination
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


@api_view(["GET"])
def recommend_hotels(request):
    hotel_name = request.GET.get("hotel_name", "")

    if hotel_name not in list(name_to_idx.keys()):
        embed = model.encode(hotel_name)
        print(embed.shape)
        embeds = np.array(list(idx_to_embed.values()))
        print(embeds.shape)
        # Cosine similarity

        sim_scores = list(enumerate(cosine_similarity(embed.reshape(1, -1), embeds)[0]))
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
