export interface ODMakeBol200Response {
  success: boolean;
  errorCodes: Array<number>;
  proNumber: number | null;
  label: string | null;
  bol: string | null;
}
