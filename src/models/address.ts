export interface ICity {
  id: string;
  name: string;
}

export interface IWard {
  Id: string;
  Name: string;
  Level: string;
}

export interface IDistrict {
  id: string;
  name: string;
  wards: IWard[];
}

export interface IAddress {
  id: number;
  name: string;
  phone: string;
  city: string;
  district: string;
  ward: string;
  address: string;
  default_address: number;
}
