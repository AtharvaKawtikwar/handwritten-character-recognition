from django.db import models

class NVDData(models.Model):
    cve_id = models.CharField(max_length=50, unique=True)
    event_name = models.TextField()

    def __str__(self):
        return self.cve_id