import { config } from "dotenv";
import { Client } from "@elastic/elasticsearch";
import { RESOURCE_NOT_FOUND } from "@staart/errors";
import { AmazonConnection } from "aws-elasticsearch-connector";

config();

const ELASTIC_HOST = process.env.ELASTIC_HOST || "";
const AWS_ELASTIC_ACCESS_KEY = process.env.AWS_ELASTIC_ACCESS_KEY || "";
const AWS_ELASTIC_SECRET_KEY = process.env.AWS_ELASTIC_SECRET_KEY || "";
const AWS_ELASTIC_HOST = process.env.AWS_ELASTIC_HOST || "";

let elasticSearchEnabled = false;
if (AWS_ELASTIC_HOST || ELASTIC_HOST) elasticSearchEnabled = true;

export { elasticSearchEnabled };

const elasticSearchConfig = AWS_ELASTIC_HOST
  ? {
      node: AWS_ELASTIC_HOST,
      Connection: AmazonConnection,
      awsConfig: {
        credentials: {
          accessKeyId: AWS_ELASTIC_ACCESS_KEY,
          secretAccessKey: AWS_ELASTIC_SECRET_KEY,
        },
      },
    }
  : {
      node: ELASTIC_HOST,
    };

/**
 * Client doesn't support the "awsConfig" property,
 * which is part of "aws-elasticsearch-connector"
 */
export const elasticSearch = elasticSearchEnabled
  ? (new (Client as any)(elasticSearchConfig) as Client)
  : {};

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
