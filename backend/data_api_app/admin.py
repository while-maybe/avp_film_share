from django.contrib import admin

from .models import Video, Author

# Register your models here.
@admin.register(Video)
class FilmVideo(admin.ModelAdmin):
    list_display = ['title', 'author', 'date_uploaded']
    list_filter = ['author', 'date_uploaded']
    search_fields = ['title', 'author', 'date_uploaded', 'comment']
    raw_id_fields = ['author']
    ordering = ['date_uploaded']
    show_facets = admin.ShowFacets.ALWAYS
    
@admin.register(Author)
class AuthorAdmin(admin.ModelAdmin):
    list_display = ['username', 'email', 'num_uploads', 'date_joined']
    list_filter = ['username', 'date_joined']
    search_fields = ['username', 'email', 'num_uploads', 'date_joined']
    ordering = ['date_joined']
    show_facets = admin.ShowFacets.ALWAYS
