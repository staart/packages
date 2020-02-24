import Joi from "@hapi/joi";

/**
 * Validate an object with its schema map
 * @param schemaMap - Schame map for Joi validation
 * @param data - Data to validate
 */
export const joiValidate = (schemaMap: Joi.SchemaMap, data: any) => {
  const schema = Joi.object().keys(schemaMap);
  const result = schema.validate(data);
  if (result.error) throw new Error(`joi:${JSON.stringify(result.error)}`);
  return true;
};
