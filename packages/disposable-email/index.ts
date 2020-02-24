import disposableDomains from "disposable-email-domains/index.json";
import wildcardDomains from "disposable-email-domains/wildcard.json";
import { joiValidate, Joi } from "@staart/validate";
import { DISPOSABLE_EMAIL } from "@staart/errors";
import { isMatch } from "matcher";

/**
 * Check if an email is disposable
 * @param email - Email to check
 */
export const checkIfDisposableEmail = (email: string) => {
  let isDisposable = false;
  joiValidate(
    {
      email: Joi.string()
        .email()
        .required()
    },
    { email }
  );
  const domain = email.split("@")[1];
  if (disposableDomains.includes(domain)) throw new Error(DISPOSABLE_EMAIL);
  const potentialMatches = wildcardDomains.filter(w => domain.includes(w));
  potentialMatches.forEach(
    d => (isDisposable = isDisposable || isMatch(email, `*.${d}`))
  );
  if (isDisposable) throw new Error(DISPOSABLE_EMAIL);
  return;
};
