from django.core.management.base import BaseCommand
import pandas as pd
from hotels.models import Hotel, Amenity, Room, HotelImages, Review, FAQ, HouseRules
import random
import os
from django.core.files import File
from account_manager.models import User
from faker import Faker
import shutil


class Command(BaseCommand):
    help = "Import data from CSV file"

    def add_arguments(self, parser):
        parser.add_argument("path", type=str, help="Path to CSV file")

    def handle(self, *args, **kwargs):
        fake = Faker()
        # fake.seed(4321)
        path = kwargs["path"]
        room_types = set()
        df = pd.read_csv(path)
        hotel_names = set()

        for _, row in df.iterrows():
            room_type = [
                room
                for room in str(row["Tags"]).strip("[]").split(",")
                if "Room" in room
            ]

            if len(room_type) > 0:
                if room_type[0] not in room_types:
                    # the room_type[0] is of the form ' 'Room' '
                    room_type = room_type[0].strip("' ")
                    room_types.add(room_type)
        room_types = list(room_types)
        price_map = {}

        for each in room_types:
            price_map[each] = random.randint(300, 1500)

        for _, row in df.iterrows():
            if (
                row["Hotel_Name"] in hotel_names
            ):  # check if the hotel name already exists
                continue
            hotel_names.add(row["Hotel_Name"])  # add the hotel name to the set
            hotel = Hotel.objects.create(
                name=row["Hotel_Name"],
                address=row["Hotel_Address"],
                room_count=random.randint(1, 11),
                hotel_score=row["Average_Score"],
                lat=row["lat"] if type(row["lat"]) == float else 0.0,
                lng=row["lng"] if type(row["lng"]) == float else 0.0,
            )
            for i in range(1, random.randint(8, 20)):
                amenity = Amenity.objects.get(id=random.randint(1, 70))
                hotel.amenities.add(amenity)

            hotel_image_path = "hotel_images/"
            hotel_image_filename = random.choice(os.listdir(hotel_image_path))
            hotel_image = HotelImages.objects.create(
                hotel=hotel, image=hotel_image_path + hotel_image_filename
            )
            hotel_image.image.save(
                hotel_image_filename,
                File(open(hotel_image_path + hotel_image_filename, "rb")),
            )
            faq_questions = [
                "What is your return policy?",
                "What are your shipping options?",
                "How do I track my order?",
                "Do you offer gift cards?",
                "What payment methods do you accept?",
            ]

            for question in faq_questions:
                answer = fake.text(max_nb_chars=200)

                faq = FAQ.objects.create(
                    hotel=hotel,
                    question=question,
                    answer=answer,
                )
                faq.save()

            house_rule = HouseRules.objects.create(
                hotel=hotel,
                smoking_allowed=random.choice([True, False]),
                pets_allowed=random.choice([True, False]),
                parties_allowed=random.choice([True, False]),
                self_check_in=random.choice([True, False]),
            )
            house_rule.save()

            room_images_path = "room_images/"
            room_images = os.listdir(room_images_path)

            for i in range(1, hotel.room_count + 1):
                random_room_type = room_types[random.randint(0, len(room_types) - 1)]
                room_image_filename = random.choice(room_images)
                room_image_path = os.path.join(room_images_path, room_image_filename)

                # create a new unique file name for the image
                room_image_newname = f"{hotel}_{i}.jpg"

                # copy the image to the media folder and rename it

                # create a new room object and set its image field
                room = Room.objects.create(
                    hotel=hotel,
                    room_type=random_room_type,
                    price=price_map[random_room_type],
                    quantity=random.randint(1, 10),
                )
                room.image.save(room_image_newname, File(open(room_image_path, "rb")))
                room.save()
        users = []
        for i in range(1, 51):
            name = fake.name().split()
            first_name = name[0]
            last_name = name[1]
            email = fake.ascii_free_email()
            password = "user123"
            gender = random.choice(["Male", "Female", "Others"])
            country = random.choice(df["Reviewer_Nationality"].unique())
            user = User.objects.create(
                first_name=first_name,
                last_name=last_name,
                email=email,
                password=password,
                gender=gender,
                country=country,
                is_active=True,
            )
            user.save()
            users.append(user)

        for user in users:
            for i in range(random.randint(4, 18)):
                hotel = Hotel.objects.order_by("?").first()
                if not hotel:
                    break
                rooms = Room.objects.filter(hotel=hotel)
                if rooms:
                    room = random.choice(rooms)
                    found_hotel = df.loc[df["Hotel_Name"] == hotel.name]

                    Review.objects.create(
                        user=user,
                        hotel=hotel,
                        room=room,
                        score=found_hotel["Reviewer_Score"].iloc[0],
                        review=found_hotel["Positive_Review"].iloc[0]
                        + found_hotel["Negative_Review"].iloc[0],
                        stay_duration=random.randint(1, 10),
                    )
                else:
                    pass
