# Document Annotation Tool



## Overview

This sophisticated web-based Document Annotation Tool combines Django for the backend and Angular for the frontend. The goal is to facilitate the labeling of words within a document and export annotations in a structured JSON format.

## Features

1. **User-Friendly Interface**
   - Intuitive design for a smooth user experience.
   - Simple navigation for enhanced user interaction.

2. **Dynamic Labeling**
   - Users can input a list of labels based on their specific needs.
   - Easy selection of labels from the provided list.

3. **Document Annotation**
   - Choose a label from the list.
   - Annotate words or sentences within the document effortlessly.

4. **Export to JSON**
   - Export annotations in a structured JSON format.
   - JSON file includes:
     - Document text
     - Annotation details: start position, end position, label, annotated text
       
5. **Leverage Pre-Trained Transformer Models for Custom Text Categorisation**
   - thanks to huggingface you can leverage one of the pre-trained models there to test your auto labeling.

## Usage Instructions

1. **Input Labels:**
   - Provide a list of labels relevant to your annotation task.

2. **Select Label:**
   - Choose a label from the list before annotating the document.

3. **Annotate Document:**
   - Highlight and annotate words or sentences within the document.

4. **Export to JSON:**
   - Generate a JSON file with detailed annotations.

## Showcase Video
https://www.youtube.com/watch?v=nWZs1G1igDo




## Getting Started

1. **Clone the repository:**

   ```bash
   git clone https://github.com/RaedNefzi98/Full_stack_test.git

2. **Go to the back Branch and fork it**

   ```bash
   python manage.py runserver
3. **Go to the front Branch and fork it**

   ```bash
   npm i -> ng serve
