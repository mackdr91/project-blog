from django.contrib import admin
from .models import Post

# Register your models here.
from django.contrib import admin
from .models import Post, Comment, Category



    
class PostAdmin(admin.ModelAdmin):
    list_display = ('title', 'list_tags')

    def list_tags(self, obj):
        return ", ".join([tag.name for tag in obj.tags.all()])

    list_tags.short_description = 'Tags'

admin.site.register(Post, PostAdmin)

admin.site.register(Comment)
admin.site.register(Category)




