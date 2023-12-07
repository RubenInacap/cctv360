# Importar funciones y clases necesarias de Django y Django Rest Framework
from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework import status
from datetime import datetime

# Importar modelos y serializadores definidos en la aplicación
from .models import Order, Orderitem, DireccionDeEnvio
from .serializers import OrderSerializer
from productos.models import Producto

# Definir una vista que permite buscar órdenes por el correo electrónico del usuario
@api_view(['GET'])
@permission_classes([IsAdminUser])
def search(request):
    # Obtener el parámetro de consulta 'query' de la solicitud
    query = request.query_params.get('query')
    # Si no se proporciona un parámetro, establecerlo como una cadena vacía
    if query is None:
        query = ''
    # Filtrar las órdenes por el correo electrónico del usuario
    order = Order.objects.filter(user__email__icontains=query)
    # Serializar los resultados y devolverlos como una respuesta JSON
    serializer = OrderSerializer(order, many=True)
    return Response({'orders': serializer.data})

# Definir una vista que obtiene todas las órdenes (solo para administradores)
@api_view(['GET'])
@permission_classes([IsAdminUser])
def get_orders(request):
    # Obtener todas las órdenes de la base de datos
    orders = Order.objects.all()
    # Serializar las órdenes y devolverlas como una respuesta JSON
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)

# Definir una vista para crear una nueva orden (requiere autenticación)
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_order(request):
    # Obtener el usuario actual y los datos de la solicitud
    user = request.user
    data = request.data
    orderItems = data['order_items']
    precio_total = data['precio_total']

    # Calcular la suma de los precios de los elementos de la orden
    suma_precios = sum(int(float(item['precio'])) * item['quantity'] for item in orderItems)

    # Verificar si el precio_total coincide con la suma de precios
    if precio_total == suma_precios:
        # Crear una nueva orden en la base de datos
        order = Order.objects.create(
            user=user,
            precio_total=precio_total
        )

        # Crear una nueva dirección de envío asociada a la orden
        DireccionDeEnvio.objects.create(
            order=order,
            direccion=data['direccion'],
            ciudad=data['ciudad'],
            codigo_postal=data['codigo_postal'],
        )

        # Iterar sobre los elementos de la orden y crear objetos Orderitem
        for i in orderItems:
            productos = Producto.objects.get(id=i['id'])
            item = Orderitem.objects.create(
                productos=productos,
                order=order,
                quantity=i['quantity'],
                precio=i['precio']
            )

            # Actualizar el stock de productos restando la cantidad de la orden
            productos.contar_stock -= item.quantity
            productos.save()

        # Serializar la nueva orden y devolverla como una respuesta JSON
        serializer = OrderSerializer(order, many=False)
        print('Data received in create_order:', data)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    else:
        # Devolver un mensaje de error si el precio_total no coincide con la suma de precios
        return Response({'El Precio Total No Coincide con la suma de precios': suma_precios}, status=status.HTTP_400_BAD_REQUEST)

# Definir una vista que obtiene detalles de una orden específica (para usuarios autenticados)
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def solo_order(request, pk):
    # Obtener el usuario actual y tratar de obtener la orden con el ID proporcionado
    user = request.user
    try:
        order = Order.objects.get(pk=pk)
        # Verificar si el usuario es un administrador o el propietario de la orden
        if user.is_staff or order.user == user:
            # Serializar la orden y devolverla como una respuesta JSON
            serializer = OrderSerializer(order, many=False)
            return Response(serializer.data)
        else:
            # Devolver un mensaje de error si el usuario no tiene acceso a la orden
            Response({'detail': 'No hay acceso para ver pedidos'},
                     status=status.HTTP_401_UNAUTHORIZED)
    except:
        # Devolver un mensaje de error si la orden no existe
        return Response({'detail': 'El Pedido No Existe'}, status=status.HTTP_400_BAD_REQUEST)

# Definir una vista que obtiene todas las órdenes de un usuario específico (requiere autenticación)
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def my_orders(request):
    # Obtener el usuario actual y todas las órdenes asociadas a ese usuario
    user = request.user
    orders = user.order_set.all()
    # Serializar las órdenes y devolverlas como una respuesta JSON
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)

# Definir una vista que marca una orden como entregada (solo para administradores)
@api_view(['PUT'])
@permission_classes([IsAdminUser])
def delivered(request, pk):
    # Obtener la orden con el ID proporcionado y marcarla como entregada
    order = Order.objects.get(pk=pk)
    order.is_delivered = True
    order.delivered_at = datetime.now()
    order.save()
    # Devolver un mensaje indicando que la orden fue entregada
    return Response('El pedido fue entregado')
