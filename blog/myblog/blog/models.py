from django.db import models
from django.contrib.auth.models import User
from taggit.managers import TaggableManager
from django_quill.fields import QuillField


class Post(models.Model):
    title = models.CharField(max_length=200)
    content = QuillField()
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='blog_posts')
    published_date = models.DateTimeField(auto_now_add=True)
    image = models.ImageField(upload_to='posts/', null=True, blank=True)
    categories = models.ManyToManyField('Category', related_name='posts', blank=True)
    tags = TaggableManager()

    def __str__(self):
        return self.title
    





class Comment(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='comments')
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_comments')
    content = models.TextField()
    created_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Comment by {self.author} on {self.post}'


class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)


    class Meta:
        verbose_name_plural = "categories"

    def __str__(self):
        return self.name
