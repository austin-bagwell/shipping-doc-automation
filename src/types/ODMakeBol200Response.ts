export interface ODMakeBol200Response {
  success: boolean;
  errorCodes: Array<number>;
  errorMessages: Array<string>;
  proNumber: number | null;
  label: string | null;
  bol: string | null;
}
