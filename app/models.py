from django.db import models

class Item(models.Model):
    item_description = models.TextField()
    clean_desc = models.TextField(blank=True, null=True)


class Annotation(models.Model):
    start = models.IntegerField()
    end = models.IntegerField()
    label = models.CharField(max_length=255)
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
