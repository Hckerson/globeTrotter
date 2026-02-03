import { AmadeusLocationType } from "../../types/api/amadeus";

export interface AmadeusOAuth2Token {
  type: string;
  username: string;
  application_name: string;
  client_id: string;
  token_type: string;
  access_token: string;
  expires_in: number;
  state: string;
  scope: string;
}

export interface AmadeusActivityResponse {
  message: string;
  data: {
    data: AmadeusActivity[];
    meta: {
      count: number;
      links: {
        self: string;
      };
    };
  };
}

export interface AmadeusActivity {
  type: AmadeusLocationType;
  id: string;
  self: {
    href: string;
    methods: string[];
  };
  name: string;
  description: string;
  geoCode: {
    latitude: number;
    longitude: number;
  };
  price: {
    amount: string;
    currencyCode: string;
  };
  pictures: string[];
  bookingLink: string;
  minimumDuration: string;
}
