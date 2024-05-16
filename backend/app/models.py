from django.db import models

class SavedData(models.Model):
    positions = models.JSONField()
    total = models.IntegerField()
