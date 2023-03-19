export interface EnvironmentInterface {
  accountId: string;
  stage: string;
  region: string;
  ws: string;
  lambda: {
    message: string;
  };
}
