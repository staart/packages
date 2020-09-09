declare module "aws-elasticsearch-connector" {
  function connector(config: AWS.Config): any;
  export = connector;
}
