from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST

from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from transformers import pipeline
import json
import re
from django.views.decorators.http import require_POST
from django.http import JsonResponse, HttpResponse
from app.models import Annotation


#setting up regex patterns
pattern = r"(?:\b\w+\b|['\"“”‘’])"
url_pattern = re.compile(r'http\S+|www\S+')
punct_pattern = re.compile(r'[^\w\s]')
digit_pattern = re.compile(r'\d+')
non_ascii_pattern = re.compile(r'[^\x00-\x7F]+')

def clean_text(text):
    # Convert to lowercase
    text = text.lower()
    # Remove URLs
    text = url_pattern.sub('', text)
    # Remove punctuation
    text = punct_pattern.sub(' ', text)
    # Remove digits
    text = digit_pattern.sub('', text)
    # Remove non-ASCII characters
    text = non_ascii_pattern.sub('', text)
    # Tokenize words and remove single characters
    words = [word for word in re.findall(pattern, text) if len(word) > 1]
    return ' '.join(words)



@csrf_exempt  #
def pipeline_api(request):
    if request.method == 'POST':
        try:
           
            data = json.loads(request.body.decode('utf-8'))

            
            raw_text = data.get('text', '')

            # Clean the text
            cleaned_text = clean_text(raw_text)

            # Extract 'candidate_labels' from the JSON data
            candidate_labels = data.get('candidate_labels', [])

           
            pipe = pipeline(model="facebook/bart-large-mnli")

            # Run the pipeline with the cleaned text and provided labels
            output = pipe(cleaned_text, candidate_labels)
            

            # Return the output as JSON
            return JsonResponse(output, safe=False)

        except Exception as e:
            
            return JsonResponse({'error': str(e)}, status=500)

    else:
        return JsonResponse({'error': 'Only POST requests are allowed'}, status=405)
@csrf_exempt
@require_POST
def export_annotations(request):
    try:
         # Parse form data
        start = request.POST.get('start')
        end = request.POST.get('end')
        label = request.POST.get('label')
        text = request.POST.get('text')

        
        data = [{
            'start': start,
            'end': end,
            'label': label,
            'text': text,
        }]

        # Create a file.txt and write JSON data to it
        file_path = 'C:\\Users\\raedn\\Downloads\\file.txt'
        with open(file_path, 'w') as file:
            json.dump(data, file)

        # Provide the file for download
        with open(file_path, 'r') as file:
            response = HttpResponse(file.read(), content_type='application/json')
            response['Content-Disposition'] = 'attachment; filename=file.txt'

        # Set CORS headers
        response['Access-Control-Allow-Origin'] = 'http://localhost:4200'
        response['Access-Control-Allow-Headers'] = '*'
        response['Access-Control-Allow-Methods'] = 'POST'

        return response

    except Exception as e:
        return JsonResponse({'error': str(e)}, status=400)
