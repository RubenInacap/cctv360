from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response

class CustomPagination(PageNumberPagination):
    # Configuración de la paginación
    page_size = 9  # Tamaño predeterminado de la página
    page_size_query_param = 'page_size'  # Parámetro de consulta para cambiar el tamaño de la página
    max_page_size = 9  # Tamaño máximo permitido de la página
    page_query_param = 'page'  # Nombre del parámetro de consulta para el número de página

    def get_paginated_response(self, data):
        # Método para personalizar la respuesta paginada

        return Response({
            'data': data,  # Información paginada
            'meta': {
                'next': self.page.next_page_number() if self.page.has_next() else None,
                # Número de la página siguiente si existe, o None si no hay siguiente
                'previous': self.page.previous_page_number() if self.page.has_previous() else None,
                # Número de la página anterior si existe, o None si no hay anterior
                'count': self.page.paginator.count  # Recuento total de elementos en el conjunto de datos paginado
            }
        })
