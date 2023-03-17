export interface Environments {
  accountId: string;
  stage: string;
  region: string;
  ws: string;
  lambda: {
    message: string;
  };
}

export const ENV_VARS: Environments = {
  accountId: process.env.ACCOUNT_ID,
  stage: process.env.STAGE,
  region: process.env.REGION,
  ws: process.env.WS,
  lambda: {
    message: process.env.LAMBDA_MESSAGE,
  },
};
