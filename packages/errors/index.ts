import { config } from "dotenv";
import {
  NOT_FOUND,
  UNPROCESSABLE_ENTITY,
  UNAUTHORIZED,
  CONFLICT,
  FORBIDDEN,
  INTERNAL_SERVER_ERROR,
  BAD_REQUEST
} from "http-status-codes";

config();

// Server errors
export const DEFAULT = `${INTERNAL_SERVER_ERROR}/server-error`;
export const DOMAIN_UNABLE_TO_VERIFY = `${BAD_REQUEST}/domain-unable-to-verify`;
export const UNABLE_TO_SEND_EMAIL = `${INTERNAL_SERVER_ERROR}/unable-to-email`;

// Tokens
export const MISSING_TOKEN = `${UNPROCESSABLE_ENTITY}/missing-token`;
export const REVOKED_TOKEN = `${UNAUTHORIZED}/revoked-token`;
export const INVALID_TOKEN = `${UNAUTHORIZED}/invalid-token`;
export const EXPIRED_TOKEN = `${UNAUTHORIZED}/expired-token`;

// Invalid user inputs
export const INVALID_INPUT = `${UNPROCESSABLE_ENTITY}/invalid-input`;
export const MISSING_PRIMARY_EMAIL = `${UNPROCESSABLE_ENTITY}/missing-primary-email`;
export const MISSING_PASSWORD = `${UNPROCESSABLE_ENTITY}/missing-password`;
export const DISPOSABLE_EMAIL = `${UNPROCESSABLE_ENTITY}/disposable-email`;
export const MISSING_FIELD = `${UNPROCESSABLE_ENTITY}/missing-field`;
export const DOMAIN_MISSING_FILE = `${BAD_REQUEST}/domain-missing-file`;
export const DOMAIN_MISSING_DNS = `${BAD_REQUEST}/domain-missing-dns`;

// Not found
export const RESOURCE_NOT_FOUND = `${NOT_FOUND}/resource-not-found`;
export const USER_NOT_FOUND = `${NOT_FOUND}/user-not-found`;
export const MEMBERSHIP_NOT_FOUND = `${NOT_FOUND}/membership-not-found`;
export const ORGANIZATION_NOT_FOUND = `${NOT_FOUND}/organization-not-found`;
export const SUBSCRIPTION_NOT_FOUND = `${NOT_FOUND}/subscription-not-found`;
export const INVOICE_NOT_FOUND = `${NOT_FOUND}/invoice-not-found`;
export const STRIPE_NO_CUSTOMER = `${NOT_FOUND}/no-customer`;

// Conflicts
export const EMAIL_EXISTS = `${CONFLICT}/email-exists`;
export const USERNAME_EXISTS = `${CONFLICT}/username-exists`;
export const INVALID_LOGIN = `${UNAUTHORIZED}/invalid-login`;
export const DOMAIN_ALREADY_VERIFIED = `${BAD_REQUEST}/domain-already-verified`;
export const USER_IS_MEMBER_ALREADY = `${BAD_REQUEST}/user-is-member-already`;

// Authentication & authorization
export const INCORRECT_PASSWORD = `${UNAUTHORIZED}/incorrect-password`;
export const INSUFFICIENT_PERMISSION = `${FORBIDDEN}/insufficient-permission`;
export const UNVERIFIED_EMAIL = `${UNAUTHORIZED}/unverified-email`;
export const UNAPPROVED_LOCATION = `${UNAUTHORIZED}/unapproved-location`;
export const INVALID_2FA_TOKEN = `${UNAUTHORIZED}/invalid-2fa-token`;
export const INVALID_API_KEY_SECRET = `${UNAUTHORIZED}/invalid-api-key-secret`;
export const IP_RANGE_CHECK_FAIL = `${UNAUTHORIZED}/ip-range-check-fail`;
export const REFERRER_CHECK_FAIL = `${UNAUTHORIZED}/referrer-check-fail`;
export const OAUTH_NO_ID = `${UNPROCESSABLE_ENTITY}/oauth-no-id`;
export const OAUTH_IDENTITY_TAKEN = `${CONFLICT}/oauth-identity-taken`;
export const OAUTH_NO_NAME = `${UNPROCESSABLE_ENTITY}/oauth-no-name`;
export const OAUTH_ERROR = `${BAD_REQUEST}/oauth-error`;
export const OAUTH_NO_EMAIL = `${NOT_FOUND}/oauth-no-email`;

// Bad requests
export const EMAIL_CANNOT_DELETE = `${BAD_REQUEST}/cannot-delete-email`;
export const CANNOT_DELETE_SOLE_MEMBER = `${BAD_REQUEST}/cannot-delete-sole-member`;
export const CANNOT_DELETE_SOLE_OWNER = `${BAD_REQUEST}/cannot-delete-sole-owner`;
export const CANNOT_UPDATE_SOLE_OWNER = `${BAD_REQUEST}/cannot-update-sole-owner`;
export const NOT_ENABLED_2FA = `${BAD_REQUEST}/invalid-2fa-token`;
export const CANNOT_INVITE_DOMAIN = `${BAD_REQUEST}/cannot-invite-domain`;

// Error logging
import {
  await,
  complete,
  error,
  debug,
  fatal,
  fav,
  info,
  note,
  pause,
  pending,
  star,
  start,
  success,
  warn,
  watch,
  log
} from "signale";
export const logError = (category: string, err: string, level: 1 | 2 = 2) => {
  if (level === 1) return error(`${category}: ${err}`);
  warn(`${category}: ${err}`);
};

export {
  await,
  complete,
  error,
  debug,
  fatal,
  fav,
  info,
  note,
  pause,
  pending,
  star,
  start,
  success,
  warn,
  watch,
  log
};
