export interface BasePathParameters {
  generatePro: boolean;
  generateBol: boolean;
  generateLabel: boolean;
  emailBol: boolean;
  emailLabel: boolean;
  modifyBol: boolean;
  dpi: boolean | number;
}

// TODO
// is this correct?
enum AddressTypes {
  billTo = "billTo",
  broker = "broker",
  consignee = "consignee",
  shipper = "shipper",
}

export interface AddressInformation {
  addressLine1: string;
  addressLine2: string;
  addressName: string;
  addressType: AddressTypes;
  attention: string;
  city: string;
  country: string;
  state: string;
  zipcode: string;
  phoneNumber: string;
}

export interface RequestFields {
  addresses: Array<AddressInformation>;
}
