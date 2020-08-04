import { config } from "dotenv";
import Stripe from "stripe";
import { INVOICE_NOT_FOUND, SUBSCRIPTION_NOT_FOUND } from "@staart/errors";

config();

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY || "";
const STRIPE_PRODUCT_ID = process.env.STRIPE_PRODUCT_ID || "";
const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET || "";

const stripe = new Stripe(STRIPE_SECRET_KEY, {
  apiVersion: "2020-03-02",
  typescript: true,
});

/**
 * Construct a Stripe webhook event
 * @param body - Raw request.body
 * @param signature - Received signature in header
 */
export const constructWebhookEvent = (
  body: string | Buffer,
  signature: string
) => {
  return stripe.webhooks.constructEvent(body, signature, STRIPE_WEBHOOK_SECRET);
};

const cleanStripeResponse = (response: Stripe.ApiList<any>) => {
  const newResponse = { ...response } as any;
  newResponse.hasMore = response.has_more;
  if (newResponse.hasMore) {
    newResponse.next = response.data[response.data.length - 1].id;
  }
  delete newResponse.has_more;
  delete newResponse.object;
  delete newResponse.url;
  return newResponse;
};

/**
 * Get the details of a customer
 * @param id - External customer ID
 */
export const getCustomer = async (id: string) => {
  return await stripe.customers.retrieve(id);
};

/**
 * Get the details of a customer
 */
export const createCustomer = async (
  organizationId: number,
  customer: Stripe.CustomerCreateParams,
  updateOrganization: (id: number, organization: any) => Promise<any>
) => {
  const created = await stripe.customers.create({
    ...customer,
    metadata: { organizationId },
  });
  await updateOrganization(organizationId, { stripeCustomerId: created.id });
  return { success: true, message: "billing-subscription-created" };
};

/**
 * Get the details of a customer
 * @param id - External customer ID
 */
export const deleteCustomer = async (id: string) => {
  await stripe.customers.del(id);
  return { success: true, message: "billing-customer-deleted" };
};

/**
 * Update the details of a customer
 */
export const updateCustomer = async (
  id: string,
  customer: Stripe.CustomerUpdateParams
) => {
  await stripe.customers.update(id, customer);
  return { success: true, message: "billing-customer-updated" };
};

/**
 * Get the details of a customer
 * @param id - External customer ID
 */
export const getInvoices = async (
  id: string,
  {
    start,
    billing,
    itemsPerPage,
    subscription,
  }: {
    start?: string;
    billing?: Stripe.InvoiceListParams.CollectionMethod;
    itemsPerPage?: number;
    subscription?: string;
  }
) => {
  return cleanStripeResponse(
    await stripe.invoices.list(
      {
        customer: id,
        starting_after: start !== "0" ? start : undefined,
        collection_method: billing,
        limit: itemsPerPage,
        subscription,
      },
      undefined
    )
  );
};

/**
 * Get the details of a customer
 * @param id - External customer ID
 */
export const getInvoice = async (id: string, invoiceId: string) => {
  const invoice = await stripe.invoices.retrieve(invoiceId);
  if (invoice.customer !== id) throw new Error(INVOICE_NOT_FOUND);
  return invoice;
};

/**
 * Get the details of a customer
 * @param id - External customer ID
 */
export const getSubscriptions = async (
  id: string,
  {
    start,
    billing,
    itemsPerPage,
    plan,
    status,
  }: {
    start?: string;
    billing?: Stripe.Subscription.CollectionMethod;
    itemsPerPage?: number;
    plan?: string;
    status?: Stripe.Subscription.Status;
  }
) => {
  return cleanStripeResponse(
    await stripe.subscriptions.list({
      customer: id,
      starting_after: start !== "0" ? start : undefined,
      collection_method: billing,
      limit: itemsPerPage,
      plan,
      status,
    })
  );
};

/**
 * Get the details of a customer
 * @param id - External customer ID
 */
export const getSubscription = async (id: string, subscriptionId: string) => {
  const subscription = await stripe.subscriptions.retrieve(subscriptionId);
  if (subscription.customer !== id) throw new Error(SUBSCRIPTION_NOT_FOUND);
  return subscription;
};

/**
 * Get the details of a customer
 * @param id - External customer ID
 */
export const updateSubscription = async (
  id: string,
  subscriptionId: string,
  data: Stripe.SubscriptionUpdateParams
) => {
  await getSubscription(id, subscriptionId);
  await stripe.subscriptions.update(subscriptionId, data);
  return { success: true, message: "billing-subscription-updated" };
};

/**
 * Create a new subscription
 * @param id - External customer ID
 */
export const createSubscription = async (
  id: string,
  {
    tax_percent,
    plan,
    billing,
    number_of_seats,
  }: {
    tax_percent?: number;
    plan: string;
    billing?: Stripe.Subscription.CollectionMethod;
    number_of_seats?: number;
  }
) => {
  await stripe.subscriptions.create({
    customer: id,
    tax_percent,
    trial_from_plan: true,
    items: [{ plan, quantity: number_of_seats }],
    collection_method: billing,
  });
  return { success: true, message: "billing-subscription-created" };
};

/**
 * Get the details of a customer
 * @param id - External customer ID
 */
export const getProductPricing = async () => {
  const plans = await stripe.plans.list({ product: STRIPE_PRODUCT_ID });
  // If you have a custom plan for a client, don't show that
  plans.data = plans.data.filter(
    (plan) => !(plan.nickname || "").toLowerCase().startsWith("custom plan")
  );
  return plans;
};

/**
 * Get the details of a customer
 * @param id - External customer ID
 */
export const getSources = async (
  id: string,
  {
    start,
    itemsPerPage,
  }: {
    start?: string;
    itemsPerPage?: number;
  }
) => {
  return cleanStripeResponse(
    await stripe.customers.listSources(id, {
      object: "card",
      starting_after: start !== "0" ? start : undefined,
      limit: itemsPerPage,
    })
  );
};

/**
 * Get the details of a customer
 * @param id - External customer ID
 */
export const getSource = async (id: string, sourceId: string) => {
  return await stripe.customers.retrieveSource(id, sourceId);
};

/**
 * Get the details of a customer
 * @param id - External customer ID
 */
export const deleteSource = async (id: string, sourceId: string) => {
  await stripe.customers.deleteSource(id, sourceId);
  return { success: true, message: "billing-source-deleted" };
};

/**
 * Get the details of a customer
 * @param id - External customer ID
 */
export const createSource = async (id: string, source: any) => {
  await stripe.customers.createSource(id, { source });
  return { success: true, message: "billing-source-created" };
};

/**
 * Get the details of a customer
 * @param id - External customer ID
 */
export const updateSource = async (id: string, cardId: string, data: any) => {
  await stripe.customers.updateSource(id, cardId, data);
  return { success: true, message: "billing-source-updated" };
};

/**
 * Get all coupons
 */
export const getCoupons = async ({
  start,
  itemsPerPage,
}: {
  start?: string;
  itemsPerPage?: number;
}) => {
  return cleanStripeResponse(
    await stripe.coupons.list({
      starting_after: start !== "0" ? start : undefined,
      limit: itemsPerPage,
    })
  );
};

/**
 * Get a coupon
 * @param couponId - Coupon ID
 */
export const getCoupon = async (couponId: string) => {
  return await stripe.coupons.retrieve(couponId);
};

/**
 * Create a new coupon
 * @param data - Coupon params
 */
export const createCoupon = async (data: Stripe.CouponCreateParams) => {
  return await stripe.coupons.create(data);
};

/**
 * Update a coupon
 * @param couponId - Coupon ID
 * @param data - New data for coupon
 */
export const updateCoupon = async (
  couponId: string,
  data: Stripe.CouponUpdateParams
) => {
  return await stripe.coupons.update(couponId, data);
};

/**
 * Delete a coupon
 * @param couponId - Coupon ID
 */
export const deleteCoupon = async (couponId: string) => {
  return await stripe.coupons.del(couponId);
};

/**
 * Get a list of balance transactions on a customer
 * @param id - Customer ID
 */
export const getCustomBalanceTransactions = async (
  id: string,
  {
    start,
    itemsPerPage,
  }: {
    start?: string;
    itemsPerPage?: number;
  }
) => {
  return await stripe.customers.listBalanceTransactions(id, {
    starting_after: start !== "0" ? start : undefined,
    limit: itemsPerPage,
  });
};

/**
 * Get a list of balance transactions on a customer
 * @param id - Customer ID
 * @param transactionId - Transaction ID
 */
export const getCustomBalanceTransaction = async (
  id: string,
  transactionId: string
) => {
  return await stripe.customers.retrieveBalanceTransaction(id, transactionId);
};

/**
 * Create a customer balance transaction
 * @param id - Customer ID
 * @param transactionId - Transaction ID
 */
export const createCustomerBalanceTransaction = async (
  id: string,
  {
    amount,
    currency,
    description,
    metadata,
  }: { amount: number; currency: string; description?: string; metadata?: any }
) => {
  return await stripe.customers.createBalanceTransaction(id, {
    amount,
    currency,
    description,
    metadata,
  });
};

/**
 * Update a customer balance transaction
 * @param id - Customer ID
 * @param transactionId - Transaction ID
 */
export const updateCustomerBalanceTransaction = async (
  id: string,
  transactionId: string,
  {
    description,
    metadata,
  }: { amount: number; currency: string; description?: string; metadata?: any }
) => {
  return await stripe.customers.updateBalanceTransaction(id, transactionId, {
    description,
    metadata,
  });
};

/**
 * Get a list of all events
 */
export const getEvents = async ({
  types,
  start,
  itemsPerPage,
}: {
  types: string[];
  start?: string;
  itemsPerPage?: number;
}) => {
  return cleanStripeResponse(
    await stripe.events.list({
      types,
      starting_after: start !== "0" ? start : undefined,
      limit: itemsPerPage,
    })
  );
};

export const getSession = async (id: string) =>
  stripe.checkout.sessions.retrieve(id);

export const createSubscriptionWithSession = async (
  plan: string,
  { success_url, cancel_url }: { success_url: string; cancel_url: string }
) => {
  return stripe.checkout.sessions.create({
    payment_method_types: process.env.STRIPE_PAYMENT_METHODS
      ? JSON.parse(process.env.STRIPE_PAYMENT_METHODS)
      : ["card", "ideal"],
    subscription_data: {
      items: [{ plan: plan }],
    },
    success_url,
    cancel_url,
  });
};

export const createSubscriptionForCustomerWithSession = async (
  id: string,
  plan: string,
  {
    success_url,
    cancel_url,
    email,
    default_tax_rates,
    coupon,
  }: {
    success_url: string;
    cancel_url: string;
    email?: string;
    default_tax_rates?: string[];
    coupon?: string;
  }
) => {
  return stripe.checkout.sessions.create({
    customer: id,
    payment_method_types: process.env.STRIPE_PAYMENT_METHODS
      ? JSON.parse(process.env.STRIPE_PAYMENT_METHODS)
      : ["card", "ideal"],
    subscription_data: {
      trial_from_plan: true,
      items: [{ plan: plan }],
      default_tax_rates,
      coupon,
    },
    customer_email: email,
    success_url,
    cancel_url,
  });
};

export const createPaymentDetailsSession = async (
  id: string,
  subscription_id: string,
  { success_url, cancel_url }: { success_url: string; cancel_url: string }
) => {
  return stripe.checkout.sessions.create({
    payment_method_types: process.env.STRIPE_PAYMENT_METHODS
      ? JSON.parse(process.env.STRIPE_PAYMENT_METHODS)
      : ["card", "ideal"],
    mode: "setup",
    setup_intent_data: {
      metadata: {
        customer_id: id,
        subscription_id: subscription_id,
      },
    },
    success_url,
    cancel_url,
  });
};
