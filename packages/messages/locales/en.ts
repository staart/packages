import { RESOURCE_CREATED, RESOURCE_UPDATED, RESOURCE_DELETED } from "../messages";

const translations: {
  [index: string]: string;
} = {};

translations[RESOURCE_CREATED] = "{{resource}} has been created";
translations[RESOURCE_UPDATED] = "{{resource}} has been updated";
translations[RESOURCE_DELETED] = "{{resource}} has been deleted";

export default translations;
