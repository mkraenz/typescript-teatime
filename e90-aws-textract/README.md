# AWS Textract Notes

## Target workflow v0

user takes photo (Amplify) -> React native -> Expo
-> maybe: ask the user to mark the ingredients in the picture (or after automatic detection with low confidence score)
-> uploads it (to S3)
-> automatically triggers Textract
-> extracts the lines and words using Textract
-> sends a message "i'm finished on job ID 1234" over SNS
-> triggers a Lambda function
-> Lambda queries Textract by Job ID 1234 for the extracted lines and words `getDocumentTextDetection`
-> writes the lines and words to some storage (DynamoDB?)
-> triggers Machine Learning to recognize the ingredients (**SageMaker**) | ALTERNATIVELY: use proximity data from Textract json result to determine the ingredients
-> triggers parsing of the ingredients (maybe Lambda?)
-> report back to the user (Amplify + AppSync?)

Orchestrated by Step Functions

## Textract BlockTypes

- `PAGE` = the complete image
- `LINE` = one line of text - consists of `WORD`s as `CHILD`ren
- `WORD` = a single word

## Textract Outputs

- `rawText.txt` - contains all recognized text
- `queryAnswers.csv` - contains question-answer pairs returned by Textract
- `keyValues.csv` - empty in our example (why? - probably because we used only `QUERY` mode, and not `FORMS` mode)
- `analyzeDocResponse.json` - contains all recognized text, as well as the bounding boxes (for reverse-lookup, i.e. text to position in image) and relationships between bounding boxes.

## CLI usage

### Detect Text in Document

```sh
aws --profile typescriptteatime --region us-east-1 textract detect-document-text --document '{"S3Object":{"Bucket":"teatime-textract-test","Name":"myuser/arizona-tea.jpg"}}'
```

### Analyze Document

Assuming newer version of AWS CLI (tested with `aws-cli/2.7.29`).

First, upload an image to S3 (here we use bucket name `teatime-textract-test`, a subdirectory `myuser` and the file `arizona-tea.jpg`)

Then, run the following command:

```sh
aws --profile typescriptteatime --region us-east-1 textract analyze-document --document '{"S3Object":{"Bucket":"teatime-textract-test","Name":"myuser/arizona-tea.jpg"}}' --feature-types '["QUERIES"]' --queries-config '{"Queries":[{"Text":"What are the ingredients?"}]}'
```

or if you have the default profile and default region setup correct:

```sh
aws textract analyze-document --document '{"S3Object":{"Bucket":"teatime-textract-test","Name":"myuser/arizona-tea.jpg"}}' --feature-types '["QUERIES"]' --queries-config '{"Queries":[{"Text":"What are the ingredients?"}]}'
```

### Follow-up Question

How do we train the Machine Learning Model to work well with our use-case?

## Synchronous vs Asynchronous operations

- Synchronous: the client sends a request and waits for a response, response is returned as soon as available and NOT stored for retrieval later

## Textract Services

- Structured data -> Document Analysis API
- Documents (i.e. less structured data) using the Queries feature -> Analyze Document API
-

## Results & Learnings

Textract is

- good for text extract
- not feasable for fully extracing the ingredients
  - -> only part of the solution
- seems to require publishing to SNS for further processing
- very low maintainance
- cost-effective
