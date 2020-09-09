import { config } from "dotenv";
import { Client } from "@elastic/elasticsearch";
import AWS from "aws-sdk";
import { RESOURCE_NOT_FOUND } from "@staart/errors";
import createAwsElasticsearchConnector from "aws-elasticsearch-connector";

config();

let elasticSearchEnabled = false;
if (process.env.AWS_ELASTIC_HOST || process.env.ELASTIC_HOST)
  elasticSearchEnabled = true;

const awsConfig = new AWS.Config({
  accessKeyId: process.env.AWS_ELASTIC_ACCESS_KEY,
  secretAccessKey: process.env.AWS_ELASTIC_SECRET_KEY,
  region: process.env.AWS_ELASTIC_REGION,
});

export { elasticSearchEnabled };

export const elasticSearch = new Client({
  ...(process.env.AWS_ELASTIC_ACCESS_KEY && process.env.AWS_ELASTIC_SECRET_KEY
    ? createAwsElasticsearchConnector(awsConfig)
    : undefined),
  node: process.env.AWS_ELASTIC_HOST || process.env.ELASTIC_HOST,
});

export const cleanElasticSearchQueryResponse = (
  response: any,
  size: number
) => {
  if (response.hits && response.hits.hits) {
    const count = response.hits.total;
    const data = response.hits.hits;
    const newResponse: any = {
      data,
      count,
    };
    if (count > data.length && data.length === size) {
      newResponse.hasMore = true;
    } else {
      newResponse.hasMore = false;
    }
    return newResponse;
  }
  throw new Error(RESOURCE_NOT_FOUND);
};
