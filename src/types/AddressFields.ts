export enum AddressTypes {
  billTo = "billTo",
  broker = "broker",
  consignee = "consignee",
  shipper = "shipper",
}

export interface AddressFields {
  addressLine1: string;
  addressLine2?: string;
  addressName: string;
  addressType: AddressTypes;
  attention?: string;
  city: string;
  country: string;
  state: string;
  zipcode: string;
  phoneNumber: string;
}
