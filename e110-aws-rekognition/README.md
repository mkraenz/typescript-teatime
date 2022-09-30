# AWS Rekognition - Detect Text

- Important notes up front - [docs](https://docs.aws.amazon.com/rekognition/latest/dg/images-information.html)
  - Supported file formats for image analysis: `.jpg` or `.png`
  - Files in S3 or local files
  - image size may affect the results (at least on `DetectLabels` api)
  - 1$ per 1000 images analyzed, for first 12 months 5,000 images per month free

## How to run

[CLI docs](https://docs.aws.amazon.com/rekognition/latest/APIReference/API_DetectText.html)

```sh
# example of Nuss Knuspermüsli. The image is oriented correctly.
aws rekognition detect-text --image '{"S3Object":{"Bucket":"teatime-test202209","Name":"groundtruth-input/PXL_20220907_144448269.jpg"}}'
```

Result is a JSON that is ordered by

- first type (all lines first, then words)
- then top to bottom as defined by `<ArrayItem>.Geometry.BoundingBox.Top`

```sh
# example of hummus pack. The image is rotated 90 degrees, so the text only readable when you tilt your head to the right.
aws rekognition detect-text --image '{"S3Object":{"Bucket":"teatime-test202209","Name":"groundtruth-input/PXL_20220907_144318505.jpg"}}' > hummus.json
```

The result lists bounding boxes as in the original image, i.e. the text is not rotated. It did find all text in the image.

## Terminology

- A _word_ is one or more script characters that aren't separated by spaces.
- A _line_ is a string of equally spaced words. A line isn't necessarily a complete sentence (periods don't indicate the end of a line)

## Restrictions

- `DetectText` and `GetTextDetection` can detect up to 100 words in an image
- designed for English, Arabic, Russian, German, French, Italian, Portuguese and Spanish
- text must be within +/- 90 degrees orientation of the horizontal axis
- Supported file formats for image analysis: `.jpg` or `.png`
  - IOS base image format is `.heic` which is not supported

## Workaround ideas

> Disclaimer: Needing to come up with workarounds before having started prototyping is not a great sign. Maybe it's better to look for other options.

### Getting around 100 word limits

```python
# idea: if we detect 100 words, then split image and rerun detection
def text_detection(image):
    # TODO recursion anchor
    if len(item with type "WORD") == 100:
        parts = splitImageIntoNPartsUsingRegionsOfInterestParam(2) # could be binary, tertiary whatever works best
        textInParts = text_detection(parts)
        results = merge_results(textInParts)
        return result
    else:
        return result
```

Additionally, ask the user to mark the text area with the ingredients within the image.
-> meh, terrible UX

### Getting around iOS `.heic` format

We can save in .png using Expo [ImageManipulator](https://docs.expo.dev/versions/latest/sdk/imagemanipulator/).

### Getting around text orientation limits

Ask the user to orient properly using Expo [ImageManipulator](https://docs.expo.dev/versions/latest/sdk/imagemanipulator/).

-> meh, terrible UX

### Getting around language limits

Hmmmmmm..... Idk.

## Alternative options

- [Azure Cognitive Services -> OCR](https://learn.microsoft.com/en-us/azure/cognitive-services/computer-vision/overview-ocr)
  - supports many languages including all that AWS supports and Chinese (printed-only), Japanese
  - JPEG, PNG, BMP, PDF, and TIFF
  - output format is JSON, similar contents to AWS (Text lines and words with location and confidence scores)
  - Note: use [READ api](https://learn.microsoft.com/en-us/azure/cognitive-services/computer-vision/overview-ocr#read-api) because that's the new operation that replaces `RecognizeText` and `ocr`
  - pricing: $1 per 1,000 transactions
- [Google Cloud Vision API - OCR](https://cloud.google.com/vision/docs/ocr)
  - The JSON includes page, block, paragraph, word, and break information.
  - very long list of [supported languages](https://cloud.google.com/vision/docs/languages#supported-langs)
  - pricing: New customers -> free $300 in credits plus All customers get 1,000 units for analyzing images free per month
