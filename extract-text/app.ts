import { S3ObjectCreatedNotificationEvent } from 'aws-lambda';
import { TextractClient, DetectDocumentTextCommand } from '@aws-sdk/client-textract';

const textractClient = new TextractClient()

export const lambdaHandler = async (event: S3ObjectCreatedNotificationEvent) => {
  // Only printing out the event structure for Debug purposes
  console.debug(event);

  const bucket = event.detail.bucket.name;
  const key = decodeURIComponent(event.detail.object.key.replace(/\+/g, ' '));

  console.debug(`Going to detect texts in bucket ${bucket} and key ${key}`);

  const words: string[] = await extractText(bucket, key);

  const response = {
    'S3Bucket' : bucket,
    'S3Key' : key,
    'words' : words
  };

  // Results logged in a structured JSON format
  console.info(response);
};

// use Textract to extract text from image
const extractText = async (bucket: string, key: string) : Promise<string[]> => {
  const params = {
    Document: {
      S3Object: {
        Bucket: bucket,
        Name: key
      }
    }
  };

  // extract text from S3 image synchronouslly
  const textData = await textractClient.send(new DetectDocumentTextCommand(params));

  console.debug('DetectDocumentTextCommand:', textData);

  let words = new Array<string>();

  // loop over Blocks array in textData
  textData?.Blocks?.forEach(block => {
    if (block.BlockType === 'WORD') {
      words.push(block.Text!);
    }
  });

  return words;
};
