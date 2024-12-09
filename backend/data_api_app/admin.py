from django.contrib import admin

from .models import Film

# Register your models here.
@admin.register(Film)
class FilmAdmin(admin.ModelAdmin):
    list_display = ['title', 'author', 'date_uploaded']
    list_filter = ['author', 'date_uploaded']
    search_fields = ['title', 'author', 'date_uploaded', 'comment']
    raw_id_fields = ['author']
    ordering = ['date_uploaded']
    show_facets = admin.ShowFacets.ALWAYS
    
    