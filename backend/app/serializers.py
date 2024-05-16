from rest_framework import serializers
from .models import SavedData

class SavedDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = SavedData
        fields = '__all__'
