import { S3Event } from 'aws-lambda';
import { lambdaHandler } from '../../app';
import { expect, describe, it } from '@jest/globals';

describe('Unit test for app handler', function () {
    it('verifies successful response', async () => {
        const event: S3Event = {
          "Records": [
            {
              "eventVersion": "2.1",
              "eventSource": "aws:s3",
              "awsRegion": "eu-south-1",
              "eventTime": "2023-10-03T19:37:27.192Z",
              "eventName": "ObjectCreated:Put",
              "userIdentity": {
                "principalId": "AWS:AIDAINPONIXQXHT3IKHL2"
              },
              "requestParameters": {
                "sourceIPAddress": "205.255.255.255"
              },
              "responseElements": {
                "x-amz-request-id": "D82B88E5F771F645",
                "x-amz-id-2": "vlR7PnpV2Ce81l0PRw6jlUpck7Jo5ZsQjryTjKlc5aLWGVHPZLj5NeC6qMa0emYBDXOo6QBU0Wo="
              },
              "s3": {
                "s3SchemaVersion": "1.0",
                "configurationId": "828aa6fc-f7b5-4305-8584-487c791949c1",
                "bucket": {
                  "name": "DOC-EXAMPLE-BUCKET",
                  "ownerIdentity": {
                    "principalId": "A3I5XTEXAMAI3E"
                  },
                  "arn": "arn:aws:s3:::lambda-artifacts-deafc19498e3f2df"
                },
                "object": {
                  "key": "image-name.jpg",
                  "size": 1305107,
                  "eTag": "b21b84d653bb07b05b1e6b33684dc11b",
                  "sequencer": "0C0F6F405D6ED209E1"
                }
              }
            }
          ]
        };
        const result = await lambdaHandler(event);
    });
});
