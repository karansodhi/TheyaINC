/* App config for apis
 */
const ApiConfig = {
  SESSION_TOEKN: "UZtGyC7rvYFz7fjUdhrBjTubApyCCZW0UDEGDJObsOu_",

  BASE_URL: "https://dev.theya.us/",
  REGISTER_PRIMARY_PUBLICK_KEY: "v1/device/register_primary_public_key",
  REGISTER_SECONDARY: "v1/device/register_secondary",
  GET_QUESTION: "/v1/misc/get_questions?session_token=",
  GET_TRANSACTION: `https://dev.theya.us/v1/wallet/transactions`,
  GET_INITIATED_TRANSACTION: `https://dev.theya.us/v1/initiated_transactions`,
  INITIATE_TRANSACTION: `https://dev.theya.us/v1/initiate_transaction`,
  PUBLISH_TRANSACTION: `https://dev.theya.us/v1/publish_transaction`,
  PRIVACY_URL: "https://www.theya.us/legal/privacy",
  TERMS_AND_CONDITION: "https://www.theya.us/legal/terms",
};

export default ApiConfig;
