from rest_framework import serializers
from .models import Order, Orderitem, DireccionDeEnvio


class DireccionSerializer(serializers.ModelSerializer):
    class Meta:
        model = DireccionDeEnvio
        fields = '__all__'


class OrderItemSerializer(serializers.ModelSerializer):

    productos = serializers.ReadOnlyField(source='productos.nombre')

    class Meta:
        model = Orderitem
        fields = '__all__'


class OrderSerializer(serializers.ModelSerializer):

    user = serializers.ReadOnlyField(source='user.email')
    order_items = serializers.SerializerMethodField(read_only=True)
    direccion_envio = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Order
        fields = '__all__'

    def get_order_items(self, obj):
        items = obj.orderitem_set.all()
        serializer = OrderItemSerializer(items, many=True)
        return serializer.data

    def get_direccion_envio(self, obj):
        try:
            direccion = DireccionSerializer(
                obj.direccionenvio, many=False).data
        except:
            direccion = False
            print("Direccion de envio:", direccion)
        return direccion