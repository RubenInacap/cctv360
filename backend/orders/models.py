from django.db import models
from users.models import User
from productos.models import Producto

# Create your models here.
class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    precio_total= models.CharField(max_length=250, blank=True)
    is_delivered = models.BooleanField(default=False)
    delivered_at = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"Order #{self.id} - User: {self.user.email}"


class Orderitem(models.Model):
    productos = models.ForeignKey(Producto, on_delete=models.SET_NULL, null=True)
    order = models.ForeignKey(Order, on_delete=models.SET_NULL, null=True)
    quantity = models.IntegerField(null=True, blank=True, default=0)
    precio = models.CharField(max_length=250, blank=True)
    def __str__(self):
        return f"OrderItem #{self.id} - Order: {self.order.id}, Product: {self.productos.nombre}"

class DireccionDeEnvio(models.Model):
    order = models.OneToOneField(Order, on_delete=models.CASCADE, null=True, blank=True, related_name='direccionenvio')
    direccion = models.CharField(max_length=250, blank=True)
    ciudad = models.CharField(max_length=100, blank=True)
    codigo_postal = models.CharField(max_length=100, blank=True)
    
    def __str__(self):
        return f"DireccionDeEnvio #{self.id}"