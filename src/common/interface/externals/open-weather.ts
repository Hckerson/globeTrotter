interface LocationLookup {
  country?: string;
  city: string;
}

interface ResponseObject {
  name: string;
  lat: number;
  lon: number;
  country: string;
  state: string;
}

interface LocalNames {
  [key: string]: string;
}

interface GeoLookupResponse {
  name: string;
  local_names: LocalNames[];
  lat: number;
  lon: number;
  country: string;
  state: string;
}
