from django.shortcuts import render

from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import generics, status

from django.utils.text import slugify

from pagination import CustomPagination
from . models import Producto
from . serializers import ProductoSerializer


@api_view(['GET'])
def get_prod_by_cate(request, categoria):
    productos = Producto.objects.filter(categoria=categoria)
    serializer = ProductoSerializer(productos, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def search(request):
    query = request.query_params.get('query')
    if query is None:
        query = ''
    productos = Producto.objects.filter(nombre__icontains=query)
    serializer = ProductoSerializer(productos, many=True)
    return Response({'productos': serializer.data})


@api_view(['GET'])
def get_products(request):
    producto = Producto.objects.all()
    pagination = CustomPagination()
    paginated_products = pagination.paginate_queryset(producto, request)
    serializer = ProductoSerializer(paginated_products, many=True)
    return pagination.get_paginated_response(serializer.data)

@api_view(['GET'])
def get_product(request, slug):
    producto = Producto.objects.get(slug=slug)
    serializer = ProductoSerializer(producto, many=False)
    return Response(serializer.data)


@api_view(['GET'])
def get_product_admin(request, id):
    producto = Producto.objects.get(id=id)
    serializer = ProductoSerializer(producto, many=False)
    return Response(serializer.data)

@api_view(['POST'])
def create_product(request):
    if request.user.is_staff:
        serializer = ProductoSerializer(data=request.data)
        if serializer.is_valid():
            nombre = serializer.validated_data['nombre']
            categoria = serializer.validated_data['categoria']
            slugJunto= nombre + categoria
            slug = slugify(slugJunto)
            
            if (serializer.Meta.model.objects.filter(slug=slug)).exists():
                return Response(status=status.HTTP_400_BAD_REQUEST)
            serializer.save(user=request.user, slug=slug)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response({'error': 'Unauthorized'}, status=status.HTTP_401_UNAUTHORIZED)



@api_view(['PUT'])
def edit_product(request, pk):
    producto = Producto.objects.get(pk=pk)
    if request.user.is_staff:
        serializer = ProductoSerializer(producto, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response(serializer.data, status=status.HTTP_401_UNAUTHORIZED)
    

@api_view(['DELETE'])
def delete_product(request, pk):
        producto = Producto.objects.get(pk=pk)
        if request.user.is_staff:
            producto.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
    
