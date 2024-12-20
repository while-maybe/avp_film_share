from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class Video(models.Model):
    video_id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=150)
    slug = models.SlugField(max_length=150, unique=True)
    location = models.URLField(default="", unique=True)
    author_id = models.ForeignKey(
        'Author',
        on_delete=models.CASCADE,
        related_name='author_videos'
    )
    description = models.TextField(max_length=1000, blank=True)
    date_uploaded = models.DateTimeField(auto_now_add=True)
    date_released = models.DateTimeField(auto_now_add=True)
    likes = models.IntegerField(default=0)
    
    is_deleted = models.BooleanField(default=False)
    
    
    class Meta:
        ordering = ['-date_uploaded']
    
    def __str__(self):
        return self.title


class Author(AbstractUser):
    class Status(models.TextChoices):
        ACTIVE = 'AC', 'Active'
        BLOCKED = 'BL', 'Blocked'
        GONE = 'GN', 'Gone'
        
    status = models.CharField(
        max_length=2,
        choices=Status,
        default=Status.ACTIVE
    )
    author_id = models.AutoField(primary_key=True)
    about = models.TextField(max_length=1500, blank=True)
    short_about = models.CharField(max_length=50)
    num_uploads = models.IntegerField(default=0)
    email = models.EmailField(unique=True)
    
    title = models.TextField(max_length=30, default="")
    firstname = models.TextField(max_length=50)
    lastname = models.TextField(max_length=50)
    
    @property
    def full_name(self):
        return f"{self.title} {self.firstname} {self.lastname}"
    
    def __str__(self):
        return self.username
    
    def inc_uploads(self):
        self.num_uploads += 1
        self.save()
