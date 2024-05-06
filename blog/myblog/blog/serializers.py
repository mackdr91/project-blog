from rest_framework import serializers
from .models import Post, Comment, Category
from django.contrib.auth.models import User
from bs4 import BeautifulSoup
from taggit.models import Tag




class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id', 'name']

class PostSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(max_length=None, use_url=True)
    content = serializers.SerializerMethodField()
    author = serializers.ReadOnlyField(source='author.username')
    comments = serializers.HyperlinkedRelatedField(
        many=True,
        read_only=True,
        view_name='comment-detail'
    )
    categories = serializers.SlugRelatedField(
        many=True,
        queryset=Category.objects.all(),
        slug_field='name'
    )

    class Meta:
        model = Post
        fields = ['id', 'title', 'content', 'author', 'published_date', 'comments', 'categories', 'image']

    def get_content(self, obj):
        soup = BeautifulSoup(obj.content.html, 'html.parser')
        for p_tag in soup.find_all('p'):
            p_tag.unwrap()  # This removes the p tags but keeps the content
        return str(soup)  # Assuming `.html` gives you the HTML content



class CommentSerializer(serializers.ModelSerializer):
    author = serializers.ReadOnlyField(source='author.username')

    class Meta:
        model = Comment
        fields = ['id', 'author', 'content', 'created_date', 'post']




class CategorySerializer(serializers.ModelSerializer):
    posts = serializers.HyperlinkedRelatedField(
        many=True,
        read_only=True,
        view_name='post-detail'
    )

    class Meta:
        model = Category
        fields = ['id', 'name', 'posts']




class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'password']
        extra_kwargs = {
            'password': {'write_only': True, 'required': True}
        }

    def create(self, validated_data):
        # Create a new user instance
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', '')
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

    def update(self, instance, validated_data):
        # Update user instance
        instance.username = validated_data.get('username', instance.username)
        instance.email = validated_data.get('email', instance.email)
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        if validated_data.get('password'):
            instance.set_password(validated_data['password'])
        instance.save()
        return instance


