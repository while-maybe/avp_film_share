from django.db import models
from django.conf import settings

# Create your models here.
class Film(models.Model):
    title = models.CharField(max_length=150)
    slug = models.SlugField(max_length=150)
    date_uploaded = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='user_videos'
    )
    
    class Meta:
        ordering = ['-date_uploaded']
    
    def __str__(self):
        return self.title
    
    