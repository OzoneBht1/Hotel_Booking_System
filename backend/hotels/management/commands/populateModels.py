from django.core.management import BaseCommand
import pandas as pd
from hotels.models import Hotel, Amenity, Room, HotelImages, Booking
import random


class Command(BaseCommand):
    help ="import data from csv file"
    
    def add_arguments(self, parser) -> None:
        pass
    
    def handle(self, *args, **kwargs):
        room_types = set()
        df = pd.read_csv("hotels.csv")
        
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
            hotel = Hotel.objects.create(
                name = row["Hotel_Name"],
                address = row["Hotel_Address"],
                room_count = random.randint(0,11),
                
            )
            for i in range(1, random.randint(8, 20)):
                amenity = Amenity.objects.get(id=random.randint(1, 103))          
                hotel.amenities.add(amenity)
    
            hotel.save()
            for i in range(hotel.room_count + 1):
                random_room_type = room_types[random.randint(0, len(room_types) - 1)]
                Room.objects.create(
                    hotel = hotel,
                    room_number = i,
                    room_type = random_room_type,
                    price = price_map[random_room_type]
                )
                
           
        
        
        
    