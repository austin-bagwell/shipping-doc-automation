import { AddressFields, AddressTypes } from "../models/AddressFields";
import {
  ReqMakeBol,
  IndividualPieceTypes,
  ReferenceTypes,
  ServiceCodes,
  HandlingUnitTypes,
} from "../models/requests/ODMakeBolRequest";

const cccBillToAddress: AddressFields = {
  addressLine1: "812 Mallard Ave",
  addressName: "Counter Culture Coffee",
  addressType: AddressTypes.billTo,
  city: "Durham",
  state: "NC",
  zipcode: "27701",
  country: "US",
  phoneNumber: "9193615282",
};

const cccDurhamWarehouseAddress: AddressFields = {
  addressLine1: "812 Mallard Ave",
  addressName: "Counter Culture Coffee",
  addressType: AddressTypes.shipper,
  city: "Durham",
  state: "NC",
  zipcode: "27701",
  country: "US",
  phoneNumber: "9193615282",
};

const dummyConsigneeAddress: AddressFields = {
  addressLine1: "123 Test Lane",
  addressName: "Testy McTesterson",
  addressType: AddressTypes.consignee,
  city: "Cityville",
  state: "NC",
  zipcode: "27701",
  country: "US",
  phoneNumber: "5553615282",
};

export const dummyMakeBolData: ReqMakeBol = {
  addresses: [
    cccBillToAddress,
    cccDurhamWarehouseAddress,
    dummyConsigneeAddress,
  ],
  descriptionDetails: [
    {
      description: "string",
      freightClass: "150",
      hazmatCheck: true,
      individualPieceType: IndividualPieceTypes.CASE,
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
      pieceCount: 7,
      referenceNumber: "PO1234",
      referenceType: ReferenceTypes.PO,
    },
  ],
  shipmentServices: [
    {
      serviceCode: ServiceCodes.CA,
      serviceDescription: "Call for appointment",
    },
  ],
  proNumber: 999999999999,
  freightTerms: "PREPAID",
  pickupDate: "2023-02-15",
  handlingUnitCount: 30,
  handlingUnitType: HandlingUnitTypes.SKID,
  skidWeight: 500,
  grossTotalWeight: 2500,
  netTotalWeight: 2000,
  cargoLiability: 0,
  hazmatContactName: "string",
  hazmatContactPhoneNumber: "0005551212",
  hazmatContractNumber: "string",
  deliveryBeginDate: "2023-02-17T08:00:00.000Z",
  deliveryEndDate: "2023-02-18T08:00:00.000Z ",
  cubicFeet: 0,
  specialInstructionsDelivery: "string",
  specialInstructionsPickup: "string",
  customer: "string",
  integrationCustomer: "string",
  thirdPartyLogistics: "string",
  transportationManagementSystem: "string",
  email: "",
};
