import Stripe from "stripe";
import { INVOICE_NOT_FOUND, SUBSCRIPTION_NOT_FOUND } from "@staart/errors";

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY || "";
const STRIPE_PRODUCT_ID = process.env.STRIPE_PRODUCT_ID || "";

const stripe = new Stripe(STRIPE_SECRET_KEY, {
  apiVersion: "2019-12-03",
  typescript: true
});

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
  organizationId: string,
  customer: Stripe.CustomerCreateParams,
  updateOrganization: (id: string, organization: any) => Promise<any>
) => {
  const created = await stripe.customers.create({
    ...customer,
    metadata: { organizationId }
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
    subscription
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
        subscription
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
    status
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
      status
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
    number_of_seats
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
    collection_method: billing
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
    plan => !(plan.nickname || "").toLowerCase().startsWith("custom plan")
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
    itemsPerPage
  }: {
    start?: string;
    itemsPerPage?: number;
  }
) => {
  return cleanStripeResponse(
    await stripe.customers.listSources(id, {
      object: "card",
      starting_after: start !== "0" ? start : undefined,
      limit: itemsPerPage
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
