from django.db import models
from account_manager.models import User

# Create your models here.

class BaseModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        abstract = True

class Amenity(BaseModel):
    name = models.CharField(max_length=200)
    
    def __str__(self):
        return self.name

    
class Hotel(BaseModel):
    name = models.CharField(max_length=200)
    address = models.CharField(max_length=200)
    amenities = models.ManyToManyField(Amenity, related_name='hotels')
    manager = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    room_count = models.IntegerField(default = 10)
    lat = models.FloatField(blank=True, null=True)
    lng = models.FloatField(blank=True, null=True)
    hotel_score = models.FloatField(default = 2.5)

    



    def get_average_rating(self):
        reviews = Review.objects.filter(hotel=self)
        total_ratings = sum([review.rating for review in reviews])
        if len(reviews) > 0:
            return total_ratings / len(reviews)
        return 2.5
        # the minimum rating from Booking.com

    
    average_rating = property(get_average_rating) 


    def __str__(self) -> str:
        return self.name
    
    
class Room(BaseModel):
    hotel = models.ForeignKey(Hotel, on_delete=models.CASCADE)
    room_number = models.IntegerField()
    room_type = models.CharField(max_length=200)
    price = models.IntegerField()    
    

class HotelImages(BaseModel):
    hotel = models.ForeignKey(Hotel, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='hotel_images/')        


class Booking(BaseModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    hotel = models.ForeignKey(Hotel, on_delete=models.CASCADE)
    room = models.ForeignKey(Room, on_delete=models.CASCADE)
    check_in = models.DateTimeField()
    check_out = models.DateTimeField()
    booking_date = models.DateTimeField(auto_now_add=True)
    cancelled = models.BooleanField(default=False)
    cancelled_date = models.DateTimeField(null=True, blank=True)
    # booking_status = models.ChoiceField(choices=[("Pending", "Pending"), ("Confirmed", "Confirmed"), ("Cancelled", "Cancelled")])
    booking_status = models.CharField(max_length=200, default="Pending")
    booking_amount = models.IntegerField(default=0)    
    def __str__(self):
        return f"{self.hotel.name} - {self.room.room_number}"
    

class Review(BaseModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    hotel = models.ForeignKey(Hotel, on_delete=models.CASCADE)
    review = models.TextField()
    score = models.IntegerField()

    def __str__(self):
        return f"{self.hotel.name} - {self.user.username}"

