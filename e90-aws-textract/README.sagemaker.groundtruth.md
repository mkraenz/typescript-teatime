# AWS SageMaker GroundTruth

Data labeling service

## Usage

- Upload images to S3 bucket
- Goto SageMaker -> GroudTruth -> Labeling Workforces -> Private -> Create private team -> Create with Cognito -> invite new workers by email -> insert your email adress -> create team
- check your email and follow the login link + login
- back to AWS Console (GUI) -> create labeling jobs
  - create new role -> access specific S3 bucket -> create role
  - complete data setup
  - task type -> bounding boxes (or semantic segmentation) -> next
  - private team -> select your team
  - set task timeout, instructions etc

## Jupyter Notebook How-To Object-labeling with SageMaker GroundTruth

- General Link to the Notebook `https://<YOUR_NOTE_BOOK>.notebook.<YOUR_REGION>.sagemaker.aws/examples/preview?example_id=%2Fhome%2Fec2-user%2Fsample-notebooks%2Fground_truth_labeling_jobs%2Fground_truth_object_detection_tutorial%2Fobject_detection_tutorial.ipynb#Define-pre-built-lambda-functions-for-use-in-the-labeling-job`
- In our case, [this link](https://teatime-test.notebook.us-east-1.sagemaker.aws/examples/preview?example_id=%2Fhome%2Fec2-user%2Fsample-notebooks%2Fground_truth_labeling_jobs%2Fground_truth_object_detection_tutorial%2Fobject_detection_tutorial.ipynb#Define-pre-built-lambda-functions-for-use-in-the-labeling-job)

- 1. the workteam,
- 2. the annotation consolidation Lambda function
- 3. the pre-labeling task Lambda function
- 4. the machine learning algorithm to perform auto-annotation

Create `train.manifest` and `validation.manifest` and upload to S3.

```sh
BUCKET=teatime-test202209
EXP_NAME=groundtruth-input/foods-and-cosmetics
BUCKET=teatime-test202209
EXP_NAME="ground-truth-od-full-demo"
aws --profile tstt-202209 --region us-east-1 s3 cp train.manifest s3://${BUCKET}/${EXP_NAME}/train.manifest
aws --profile tstt-202209 --region us-east-1 s3 cp validation.manifest s3://${BUCKET}/${EXP_NAME}/validation.manifest
```

Create the SageMaker training job

```sh
BUCKET=teatime-test202209
EXP_NAME="ground-truth-od-full-demo"
TRAIN_MANIFEST=s3://${BUCKET}/${EXP_NAME}/train.manifest
VALIDATION_MANIFEST=s3://${BUCKET}/${EXP_NAME}/validation.manifest
ATTRIBUTE_NAMES=["source-ref", "XXXX"]
```

## Terminology

### Annotation

An annotation is the result of a single worker's labeling task.

### Annotation consolidation

combines the annotations of two or more workers into a single label for your data objects.

### pre-annotation lambda

Before a labeling task is sent to the worker, your pre-annotation Lambda function is invoked.
Ground Truth sends your Lambda function a JSON-formatted request to provide details about the labeling job and the data object.

# What did we achieve?

- we uploaded images to file storage (S3)
- setup AWS SageMaker GroundTruth to label the images (i.e. manually create bounding boxes around the ingredients list) to train our ML model on (in a later step)
- setup AWS SageMaker Notebook to actually do the API calls
- create a SageMaker training job to train our ML model
- it automatically exported the trained model to S3
- created a batch job to predict bounding boxes on the provided images
- deployed the ML model to AWS SageMaker Endpoint
- predicted bounding boxes of an image using the deployed ML model
- Result: we have a trained ML model that was able to find multiple bounding boxes in the image with very low accuracy (max was 0.26 confidence score out of 1.0)
