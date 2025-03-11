import requests
import time
from django.core.management.base import BaseCommand
from api.models import NVDData

class Command(BaseCommand):
    help = 'Fetch and store NVD data'

    def handle(self, *args, **kwargs):
        base_url = "https://services.nvd.nist.gov/rest/json/cves/2.0"
        results_per_page = 2000  # Number of results per request
        start_index = 0  # Start index for pagination
        total_results = 200000  # Total number of results to fetch

        while start_index < total_results:
            url = f"{base_url}?resultsPerPage={results_per_page}&startIndex={start_index}"
            response = requests.get(url)

            # Check if the request was successful
            if response.status_code != 200:
                self.stdout.write(self.style.ERROR(f"Failed to fetch data: {response.status_code}"))
                break

            try:
                data = response.json()
            except ValueError as e:
                self.stdout.write(self.style.ERROR(f"Invalid JSON response: {e}"))
                break

            # Check if the response contains CVE data
            if 'vulnerabilities' not in data:
                self.stdout.write(self.style.ERROR("No CVE data found in response"))
                break

            # Save data to the database
            for item in data['vulnerabilities']:
                cve_id = item['cve']['id']
                event_name = item['cve']['descriptions'][0]['value']  # Use the first description
                NVDData.objects.get_or_create(
                    cve_id=cve_id,
                    defaults={'event_name': event_name}
                )

            self.stdout.write(self.style.SUCCESS(f"Fetched {len(data['vulnerabilities'])} items"))

            # Update the start index for the next request
            start_index += results_per_page

            # Add a delay to avoid hitting rate limits
            time.sleep(6)  # 6 seconds delay (5 requests per 30 seconds)