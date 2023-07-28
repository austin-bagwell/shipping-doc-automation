// The Pickup API allows the submission of an electronic pickup request. The request can include multiple shipments being picked up from the same location at the same time. A pickup number will be returned to identify the pickup request and pre-pro IDs (PPIDs) will be provided for each shipment. These numbers can be used to cancel, modify, or query the pickup request information.

export interface ODPickupRequest {
  // TODO
  // date string HH:MM:SS validation
  pickupTime: string;
  openTime: string;
  closeTime: string;
  shipper: ODPickupContactDetails;
  requester: ODPickupContactDetails;
  shipments: Array<ShipmentDetails>;

  appointmentFlag?: boolean;
  //   email validation regexs?
  notificationEmailAddresses?: Array<string>;
  instructions?: Array<PickupInstructions>;
}

export interface ShipmentDetails {
  consignee: ODPickupContactDetails;
  billTo: ODPickupContactDetails;
  proNumber?: number;
  totalHandlingUnits?: number;
  totalWeight?: number;
  comments?: string;
  //   TODO
  // date formate validation YYYY-MM-DD
  requestedDeliveryDate?: string;
  //   HH:MM:SS
  requestedDeliveryTime?: string;
  //   TODO
  // API guide inconsistent
  shipmentServices?: Array<ShipmentServices>;
  shipmentItems?: Array<ShipmentItems>;
  shipmentReferences?: ShipmentReferences;
}

export interface ODPickupContactDetails {
  city: string;
  //   TODO state abreviations
  state: string;
  zipCode: string;
  firstName: string;
  lastName?: string;
  telephoneNumber: string;
  //   TODO validation
  //match regex .+@.+..+.
  emailAddress?: string;
  streetAddressOne?: string;
  streetAddressTwo?: string;
  companyName: string;
  customerAccountNumber?: string;
  //   TODO Values enum
  // but also I'll only ever use US so.... eh
  country?: string;
  secondaryTelephoneNumber?: string;
  faxNumber?: string;
}

enum PickupInstructionsTypes {
  pickup = "PICKUP",
  shipper = "SHIPPER",
}

export interface PickupInstructions {
  type: PickupInstructionsTypes;
  instructionComment: string;
}

export interface ShipmentServices {
  serviceCode: string;
}

export interface ShipmentItems {
  lineDescription?: string;
  lineNumber?: number;
  itemClass?: string;
  cube?: number;
  weight?: number;
  units?: number;
  height?: number;
  width?: number;
  length?: number;
  nmfcItem?: string;
  nmfcSubItem?: string;
}

// TODO shipment references
export interface ShipmentReferences {
  referenceType?: string;
  referenceNumber?: string;
}
