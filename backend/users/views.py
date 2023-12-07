from django.shortcuts import render
from rest_framework import generics
from django.contrib.auth.hashers import make_password
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from django.db import IntegrityError
import traceback 
from traceback import print_exc

from django.core.exceptions import ValidationError
# Create your views here.

from . serializers import (
        MyTokenObtainPairSerializer,
        MyUserSerializer,
        UserSerializer
        )

from . models import User

@api_view(['POST'])
def register(request):
    data = request.data
    email = data.get('email', '')
    username = data.get('username', '')

    # Verificar si el correo electrónico ya existe
    if User.objects.filter(email=email).exists():
        return Response({'error': 'Ya existe un usuario con este correo electrónico.'}, status=status.HTTP_400_BAD_REQUEST)

    # Verificar si el nombre de usuario ya existe
    if User.objects.filter(username=username).exists():
        return Response({'error': 'Ya existe un usuario con este nombre de usuario.'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        user = User.objects.create(
            email=email,
            username=username,
            password=make_password(data['password'])
        )
        serializer = MyUserSerializer(user, many=False)
        return Response(serializer.data)
    except ValidationError as e:
        # Manejar las validaciones de modelo (por ejemplo, contraseñas demasiado cortas)
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        print(f"Error durante el registro de usuario: {e}")
        return Response({'error': 'Error durante el registro de usuario.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_solo_user(request, pk):
    user = User.objects.get(pk=pk)
    serializer = UserSerializer(user)
    return Response(serializer.data)


@api_view(['PUT'])
def edit_profile(request, email):
    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.user == user:
        serializer = UserSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response(status=status.HTTP_401_UNAUTHORIZED)


@api_view(['GET'])
def search(request):
    query = request.query_params.get('query')
    if query is None:
        query = ''
    user = User.objects.filter(email__icontains=query) & User.objects.exclude(email='admin@admin.com')
    serializer = UserSerializer(user, many=True)
    return Response({'users': serializer.data})


@api_view(['DELETE'])
def delete_user(request, pk):
    user = User.objects.get(pk=pk)
    if request.user.is_staff:
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    return Response(status=status.HTTP_401_UNAUTHORIZED)


@api_view(['GET'])
def get_users(request):
    if request.user.is_staff:
        users = User.objects.exclude(email='admin@admin.com')
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)
    return Response(serializer.data, status=status.HTTP_401_UNAUTHORIZED)


class LoginView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer