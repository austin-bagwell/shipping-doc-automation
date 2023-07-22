import { AddressFields } from "./AddressFields";

// goal: interface accounts for all fields expected in ./exampleOdBolRequest.json
export interface ODMakeBolRequest {
  addresses: Array<AddressFields>;
  descriptionDetails: Array<DescriptionDetails>;
  //   TODO make interface
  handlingUnitDetails: Array<any>;
  referenceNumbers: Array<ReferenceNumbers>;
  shipmentServices: Array<ShipmentServices>;
  proNumber?: number | null;
  freightTerms: string;
  pickupDate: string;
  handlingUnitCount: number;
  handlingUnitType: HandlingUnitTypes;
  skidWeight: number;
  grossTotalWeight: number;
  netTotalWeight: number;
  cargoLiability?: number;
  hazmatContactName?: string;
  hazmatContactPhoneNumber?: string;
  hazmatContractNumber?: string;
  //   TODO dateString type
  //   "2023-02-17T08:00:00.000Z"
  deliveryDateType: string;
  deliveryBeginDate: string;
  deliveryEndDate?: string;
  cubicFeet: number;
  specialInstructionsDelivery?: string;
  specialInstructionsPickup?: string;
  customer: string;
  integrationCustomer?: string;
  thirdPartyLogistics?: string;
  transportationManagementSystem?: string;
  email: string;
  cc: Array<string>;
}

export interface MakeBOLRequestQueryParams {
  generatePro?: boolean | null;
  generateBol?: boolean | null;
  generateLabel?: boolean | null;
  emailBol?: boolean | null;
  emailLabel?: boolean | null;
  modifyBol?: boolean | null;
  dpi?: number | null;
}

interface DescriptionDetails {
  description: string;
  freightClass: string;
  hazmatCheck: boolean;
  individualPieceType: IndividualPieceTypes;
  individualPieces: number;
  nmfc: string;
  nmfcSub: string;
  pieces: number;
  weight: number;
}

export enum IndividualPieceTypes {
  CASE = "CASE",
  SKID = "SKID",
}

export enum ReferenceTypes {
  CPH = "CPH",
  BOL = "BOL",
  LOAD = "LOAD",
  PO = "PO",
}

interface ReferenceNumbers {
  pieceCount: number;
  referenceNumber: string;
  referenceType: ReferenceTypes;
}

// only grabbing the one I actually use
// CA = call for appointment
export enum ServiceCodes {
  CA = "CA",
}

interface ShipmentServices {
  serviceCode: ServiceCodes;
  serviceDescription?: string | null;
}

export enum HandlingUnitTypes {
  SKID = "SKID",
}
