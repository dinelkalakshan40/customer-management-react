export interface Address {
  line1: string;
  line2: string;
  cityId: number;
  countryId: number;
}

export interface Customer {
  id?: number;
  name: string;
  dob: string;
  nic: string;
  mobiles: string[];
  addresses: Address[];
}

export interface Family {
  customerId: number;
  familyMemberId: number;
}
export interface Country {
  id: number;
  name: string;
}

export interface City {
  id: number;
  name: string;
}