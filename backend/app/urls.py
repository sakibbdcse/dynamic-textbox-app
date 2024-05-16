from django.urls import path
from .views import get_data, save_total

urlpatterns = [
    path('api/get-data/', get_data, name='get_data'),
    path('api/save-total/', save_total, name='save_total'),
]

