import { config } from "dotenv";
import { Client } from "@elastic/elasticsearch";
import { RESOURCE_NOT_FOUND } from "@staart/errors";
import { AmazonConnection } from "aws-elasticsearch-connector";
import AWS from "aws-sdk";

config();

const ELASTIC_HOST = process.env.ELASTIC_HOST || "";
const AWS_ELASTIC_ACCESS_KEY = process.env.AWS_ELASTIC_ACCESS_KEY || "";
const AWS_ELASTIC_SECRET_KEY = process.env.AWS_ELASTIC_SECRET_KEY || "";
const AWS_ELASTIC_HOST = process.env.AWS_ELASTIC_HOST || "";

AWS.config.update({
  accessKeyId: AWS_ELASTIC_ACCESS_KEY,
  secretAccessKey: AWS_ELASTIC_SECRET_KEY
});

/**
 * Client doesn't support the "awsConfig" property,
 * which is part of "aws-elasticsearch-connector"
 */
export const elasticSearch = new (Client as any)({
  node: AWS_ELASTIC_HOST || ELASTIC_HOST,
  Connection: AmazonConnection,
  awsConfig: {
    credentials: {
      accessKeyId: AWS_ELASTIC_ACCESS_KEY,
      secretAccessKey: AWS_ELASTIC_SECRET_KEY
    }
  }
}) as Client;

export const cleanElasticSearchQueryResponse = (
  response: any,
  size: number
) => {
  if (response.hits && response.hits.hits) {
    const count = response.hits.total;
    const data = response.hits.hits;
    const newResponse: any = {
      data,
      count
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
