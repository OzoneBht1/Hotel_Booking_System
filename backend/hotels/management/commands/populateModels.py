from django.core.management.base import BaseCommand
import pandas as pd
from hotels.models import Hotel, Amenity, Room, HotelImages, Booking, Review
import random
import os
from django.core.files import File
from account_manager.models import User

class Command(BaseCommand):
    help = "Import data from CSV file"

    def add_arguments(self, parser):
        parser.add_argument('path', type=str, help='Path to CSV file')

    def handle(self, *args, **kwargs):
        path = kwargs['path']
        room_types = set()
        df = pd.read_csv(path)
        hotel_names = set()  # set to keep track of hotel names already added

        for index, row in df.iterrows():
            room_type = [room for room in str(row["Tags"]).strip("[]").split(",") if "Room" in room]

            if (len(room_type) > 0):
                if room_type[0] not in room_types:
                    # the room_type[0] is of the form ' 'Room' '
                    room_type = room_type[0].strip("' ")
                    room_types.add(room_type)
        room_types = list(room_types)
        price_map = {}

        for each in room_types:
            price_map[each] = random.randint(1000, 10000)

        for index, row in df.iterrows():
            if row["Hotel_Name"] in hotel_names:  # check if the hotel name already exists
                continue
            hotel_names.add(row["Hotel_Name"])  # add the hotel name to the set
            hotel = Hotel.objects.create(
                name=row["Hotel_Name"],
                address=row["Hotel_Address"],
                room_count=random.randint(0, 11),
                hotel_score=row["Average_Score"],
                lat = row["lat"] if type(row["lat"]) == float else 0.0,
                lng = row["lng"] if type(row["lng"]) == float else 0.0,
            )
            for i in range(1, random.randint(8, 20)):
                amenity = Amenity.objects.get(id=random.randint(1, 71))
                hotel.amenities.add(amenity)

           
            # Add hotel image
            for i in range(7):  # create 7 hotel images
                hotel_image_path = "hotel_photos/"
                hotel_image_filename = random.choice(os.listdir(hotel_image_path))
                hotel_image = HotelImages.objects.create(
                    hotel=hotel,
                    image=hotel_image_path + hotel_image_filename
                )
                hotel_image.image.save(hotel_image_filename, File(open(hotel_image_path + hotel_image_filename, 'rb')))

            

            hotel.save()
            for i in range(1, hotel.room_count + 1):
                random_room_type = room_types[random.randint(0, len(room_types) - 1)]
                Room.objects.create(
                    hotel=hotel,
                    room_number=i,
                    room_type=random_room_type,
                    price=price_map[random_room_type]
                )
        users = []
        for i in range(1, 51):
            first_name = f"User{i}"
            last_name = "Test"
            email = f"user{i}@example.com"
            password = "user123"
            gender = random.choice(['Male', 'Female', 'Others'])
            country = random.choice(df['Reviewer_Nationality'].unique())
            user = User.objects.create(
                first_name=first_name,
                last_name=last_name,
                email=email,
                password=password,
                gender=gender,
                country=country,
                is_active=True
            )
            user.save()
            users.append(user)

        for user in users:
            for i in range(random.randint(1, 5)):
                hotel = Hotel.objects.get(id=random.randint(1, 1492))
                room = Room.objects.get(hotel=hotel, id=random.randint(1, hotel.room_count))
                Booking.objects.create(
                    user=user,
                    hotel=hotel,
                    room=room,
                    check_in_date="2021-10-10",
                    check_out_date="2021-10-11",
                    booking_date="2021-10-10",
                    total_price=room.price,
                    status=random.choice(['Booked', 'Cancelled'])
                )    

            for i in range(random.randint(1, 12)):
                hotel = Hotel.objects.get(id=random.randint(1, 1492))
                room = Room.objects.get(hotel=hotel, id=random.randint(1, hotel.room_count))
                found_hotel = df.loc[df['hotel_name'] == hotel.name]
                Review.objects.create(
                    user=user,
                    hotel=hotel,
                    room=room,
                    rating= found_hotel["Reviewer_Score"],
                    review= found_hotel["Positive_Review"] + found_hotel["Negative_Review"]
                )
