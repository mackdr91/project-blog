from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views


router = DefaultRouter()
router.register(r'posts', views.PostViewSet)
router.register(r'comments', views.CommentViewSet)
router.register(r'categories', views.CategoryViewSet)


urlpatterns = [
    path('', include(router.urls)),
    path('tags/', views.TagListView.as_view(), name='tag-list'),
    
]
