from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import SavedData
from .serializers import SavedDataSerializer

@api_view(['GET'])
def get_data(request):
    saved_data = SavedData.objects.first()  # Assuming you have only one record
    serializer = SavedDataSerializer(saved_data)
    return Response(serializer.data)

@api_view(['POST'])
def save_total(request):
    data = request.data
    serializer = SavedDataSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)