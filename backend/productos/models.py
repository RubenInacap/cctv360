from django.db import models
from users.models import User
from django.utils import timezone

class Producto(models.Model):
    slug= models.SlugField(max_length=50, null=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    nombre = models.CharField(max_length=100, blank=True)
    image = models.ImageField(default="placeholder.png")
    categoria = models.CharField(max_length=100, blank=True)
    descripcion = models.CharField(max_length=300, blank=True)
    valoracion = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    numero_reviews = models.IntegerField(default=0)
    precio = models.DecimalField(max_digits=10 , decimal_places=2, null=True, blank=True)
    contar_stock = models.IntegerField(default=0)
    created = models.DateTimeField(auto_now_add=True)

class Reviews(models.Model):
    producto = models.ForeignKey(Producto, on_delete=models.SET_NULL,null=True)
    user= models.ForeignKey(User, on_delete=models.SET_NULL ,null=True)
    valoracion = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    descripcion = models.CharField(max_length=100, blank=True)
    created = models.DateTimeField(auto_now_add=True)


