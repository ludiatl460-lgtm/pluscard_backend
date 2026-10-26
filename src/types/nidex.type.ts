import { Gender, ReconcileStatus } from "@prisma/client";


export interface CreateUserInput {
  name: string;
  lastname?: string;
  gender: Gender;
  contact: string;
  email?: string;
  username: string;
  password: string;
}

export interface UpdateUserInput {
  name?: string;
  lastname?: string;
  gender?: Gender;
  contact?: string;
  email?: string;
  username?: string;
  password?: string;
}



export interface FrontEndFileDto {
  cardType: string;
  transactionDateTime: string;
  merchantId: string;
  merchantName: string;
  Shift: string;
  terminalId: string;
  cardNumber: string;
  vehicleLicense: string;
  product: string;
  priceLiter: number;
  numberOfLiters: number;
  total: number;
  status: string;
  approveCode: string;
  referenceNumber: string;
}

export interface BackEndFileDto {
  no: number;
  system: string;
  cardType: string;
  cardGrade: string;
  cutOfDate: string;
  transactionDateTime: string;
  setteldDateTime: string;
  merchant: string;
  merchantName: string;
  terminal: string;
  customer: string;
  customerEngName: string;
  customerLaoName: string;
  seq: number;
  card: string;
  vehicalLicense: string;
  product: string;
  productType: string;
  priceLiter: number;
  numberOfLiters: number;
  amount: number;
  transactionStatus: string;
  previousOdo: string;
  odoMeter: string;
  distance: string;
  consumption: string;
  invoice: string;
  reference: string;
  approveCode: string;
  endpoint: string;
  responseCode: string;
  errorCode: string;
}

export interface ReconcliledByDto {
  id: string;
  name: string;
  lastname?: string;
  gender: Gender;
  contact: string;
  email?: string;
}

export interface ReconciliationDto {
  reconcileCode: string;
  frontend?: FrontEndFileDto | null;
  backend?: BackEndFileDto | null;
  status: ReconcileStatus;
}

export interface CreateResultInput {
  manageBy: ReconcliledByDto;
  items: ReconciliationDto[];
}

export interface UpdateResultInput {
  manageBy?: ReconcliledByDto;
  items?: ReconciliationDto[];
}