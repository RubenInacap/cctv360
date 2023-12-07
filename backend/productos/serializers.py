from rest_framework import serializers
from . models import Producto, Reviews


class ReviewsSerializer(serializers.ModelSerializer):
    avatar = serializers.SerializerMethodField(source='user.avatar.url')
    user = serializers.ReadOnlyField(source='user.email')
    
    class Meta:
        model = Reviews
        fields = "__all__"
    
    def get_avatar(self, obj):
        return obj.user.avatar.url
    

class ProductoSerializer(serializers.ModelSerializer):
    reviews = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Producto
        fields = "__all__"
    
    def get_reviews(self, obj):
        reviews = obj.reviews_set.all()
        serializers = ReviewsSerializer(reviews, many=True)
        return serializers.data