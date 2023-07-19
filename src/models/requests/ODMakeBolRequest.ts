import { AddressFields } from "../AddressFields";

// goal: interface accounts for all fields expected in ./exampleOdBolRequest.json
export interface ReqMakeBol {
  addresses: Array<AddressFields>;
  descriptionDetails: Array<DescriptionDetails>;
  //   TODO make interface
  handlingUnitDetails: Array<any>;
  referenceNumbers: Array<ReferenceNumbers>;
  shipmentServices: Array<ShipmentServices>;
  proNumber: number | null;
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
  deliveryBeginDate: string;
  deliveryEndDate: string;
  cubicFeet: number;
  specialInstructionsDelivery?: string;
  specialInstructionsPickup?: string;
  customer: string;
  integrationCustomer?: string;
  thirdPartyLogistics?: string;
  transportationManagementSystem?: string;
  email: string;
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

enum IndividualPieceTypes {
  CASE = "CASE",
  SKID = "SKID",
}

enum ReferenceTypes {
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
enum ServiceCodes {
  CA = "CA",
}

interface ShipmentServices {
  serviceCode: ServiceCodes;
  serviceDescription?: string | null;
}

enum HandlingUnitTypes {
  SKID = "SKID",
}

const exampleBolRequest = {
  addresses: [
    {
      addressLine1: "string",
      addressLine2: "string",
      addressName: "string",
      addressType: "string",
      attention: "shipper",
      city: "string",
      country: "USA",
      state: "VA",
      zipcode: "90210",
      phoneNumber: "0005551212",
    },
    {
      addressLine1: "string",
      addressLine2: "string",
      addressName: "string",
      addressType: "consignee",
      attention: "string",
      city: "string",
      country: "USA",
      state: "VA",
      zipcode: "90210",
      phoneNumber: "0005551212 ",
    },
    {
      addressLine1: "string",
      addressLine2: "string",
      addressName: "string",
      addressType: "billTo",
      attention: "string",
      city: "string",
      country: "USA",
      state: "VA",
      zipcode: "90210",
      phoneNumber: "0005551212 ",
    },
  ],
  descriptionDetails: [
    {
      description: "string",
      freightClass: "150",
      hazmatCheck: true,
      individualPieceType: "DRUM",
      individualPieces: 2,
      nmfc: "",
      nmfcSub: "",
      pieces: 2,
      weight: 1000,
    },
  ],
  handlingUnitDetails: [],
  referenceNumbers: [
    {
      pieceCount: 0,
      referenceNumber: "string",
      referenceType: "PPID",
    },
    {
      pieceCount: 0,
      referenceNumber: "string",
      referenceType: "BOL",
    },
    {
      pieceCount: 7,
      referenceNumber: "string",
      referenceType: "PO",
    },
    {
      pieceCount: 0,
      referenceNumber: "string",
      referenceType: "PKU",
    },
    {
      pieceCount: 0,
      referenceNumber: "string",
      referenceType: "LOAD",
    },
  ],
  shipmentServices: [
    {
      serviceCode: "CSD",
      serviceDescription: "Construction Site Delivery",
    },
  ],
  tradeShows: [
    {
      service: "Pickup",
      show: "string",
      booth: "string",
      contractor: "string",
      exhibitor: "string",
    },
  ],
  proNumber: 55555555555,
  freightTerms: "PREPAID",
  pickupDate: "2023-02-15",
  handlingUnitCount: 30,
  handlingUnitType: "SKID",
  skidWeight: 500,
  grossTotalWeight: 2500,
  netTotalWeight: 2000,
  cargoLiability: 0,
  hazmatContactName: "string",
  hazmatContactPhoneNumber: "0005551212",
  hazmatContractNumber: "string",
  deliveryBeginDate: "2023-02-17T08:00:00.000Z",
  deliveryEndDate: "2023-02-17T08:00:00.000Z ",
  cubicFeet: 0,
  specialInstructionsDelivery: "string",
  specialInstructionsPickup: "string",
  customer: "string",
  integrationCustomer: "string",
  thirdPartyLogistics: "string",
  transportationManagementSystem: "string",
  email: "",
};
