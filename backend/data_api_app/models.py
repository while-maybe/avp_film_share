from django.db import models
from django.conf import settings

# Create your models here.
class Film(models.Model):
    title = models.CharField(max_length=150)
    author = models.ForeignKey(
        'Author',
        on_delete=models.CASCADE,
        related_name='user_videos'
    )
    comment = models.TextField(max_length=1000, blank=True)
    slug = models.SlugField(max_length=150)
    date_uploaded = models.DateTimeField(auto_now_add=True)
    likes = models.IntegerField
    
    class Meta:
        ordering = ['-date_uploaded']
    
    def __str__(self):
        return self.title

class Author(models.Model):
    class Status(models.TextChoices):
        ACTIVE = 'AC', 'Active'
        BLOCKED = 'BL', 'Blocked'
        GONE = 'GN', 'Gone'
        
    status = models.CharField(
        max_length=2,
        choices=Status,
        default=Status.ACTIVE
    )
    username = models.CharField(max_length=35)
    password = models.CharField(max_length=25)
    email = models.CharField(max_length=100)
    about = models.TextField(max_length=1000, blank=True)
    date_joined = models.DateTimeField(auto_now_add=True)
    num_uploads = models.IntegerField
    
    def __str__(self):
        return self.username
    
    def inc_uploads(self):
        self.num_uploads += 1
        self.save()
        