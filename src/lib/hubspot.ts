// HubSpot Forms API integration
// Submissions go to HubSpot CRM as Contacts + Form Submissions.

export const HUBSPOT_PORTAL_ID = "242669442";
export const HUBSPOT_CONTACT_FORM_ID = "8e0442dc-76ff-4183-9851-114c4642fd5d";
export const HUBSPOT_QUOTE_FORM_ID = "0e0df802-0403-4829-93d4-ce6b81433ffc";

type HubSpotField = { name: string; value: string };

/**
 * Splits "First Last" or "First Middle Last" into { firstname, lastname }.
 * If only one word is provided, it goes into firstname and lastname is empty.
 */
export function splitName(fullName: string): { firstname: string; lastname: string } {
  const parts = fullName.trim().split(/\s+/);
  if (parts.length === 0) return { firstname: "", lastname: "" };
  if (parts.length === 1) return { firstname: parts[0], lastname: "" };
  return {
    firstname: parts[0],
    lastname: parts.slice(1).join(" "),
  };
}

/**
 * Submit a record to a HubSpot form via the Forms API.
 * Throws if the request fails.
 */
export async function submitToHubSpot(
  formId: string,
  fields: Record<string, string>,
  options?: { pageName?: string; pageUri?: string }
): Promise<void> {
  const fieldsArray: HubSpotField[] = Object.entries(fields)
    .filter(([, v]) => v !== undefined && v !== null && v !== "")
    .map(([name, value]) => ({ name, value: String(value) }));

  const pageUri =
    options?.pageUri ??
    (typeof window !== "undefined" ? window.location.href : "");
  const pageName =
    options?.pageName ??
    (typeof document !== "undefined" ? document.title : "");

  const body = {
    fields: fieldsArray,
    context: {
      pageUri,
      pageName,
    },
  };

  const url = `https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${formId}`;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    let detail = "";
    try {
      detail = await res.text();
    } catch {
      // ignore
    }
    throw new Error(`HubSpot submission failed (${res.status}): ${detail}`);
  }
}
