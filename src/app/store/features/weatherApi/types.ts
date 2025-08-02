export type CityWeatherData = {
  location: {
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    tz_id: string;
    localtime_epoch: number;
    localtime: string;
  };
  current: {
    last_updated_epoch: number;
    last_updated: string;
    temp_c: number;
    temp_f: number;
    is_day: number;
    condition: {
      text: string;
      icon: string;
      code: number;
    };
    wind_mph: number;
    wind_kph: number;
    wind_degree: number;
    wind_dir: string;
    pressure_mb: number;
    pressure_in: number;
    precip_mm: number;
    precip_in: number;
    humidity: number;
    cloud: number;
    feelslike_c: number;
    feelslike_f: number;
    windchill_c: number;
    windchill_f: number;
    heatindex_c: number;
    heatindex_f: number;
    dewpoint_c: number;
    dewpoint_f: number;
    vis_km: number;
    vis_miles: number;
    uv: number;
    gust_mph: number;
    gust_kph: number;
  };
};

export type CityWeatherQuery =
  | Pick<LocationSearchResult, "lat" | "lon">
  | undefined;

export type WeatherApiSearchResponse = {
  id: number;
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  url: string;
};

export type LocationSearchResult = {
  lat: number;
  lon: number;
  name: string;
  region: string;
  country: string;
};

export type LocationSearchQuery =
  | {
      lat: number;
      lon: number;
    }
  | { searchQuery: string };

export type GeocoderResponse = {
  response: {
    GeoObjectCollection: {
      metaDataProperty: {
        GeocoderResponseMetaData: {
          request: string;
          found: string;
          results: string;
        };
      };
      featureMember: Array<{
        GeoObject: {
          metaDataProperty: {
            GeocoderMetaData: {
              kind: string;
              text: string;
              precision: string;
              Address: {
                country_code: string;
                postal_code: string;
                formatted: string;
                Components: Array<{
                  kind: string;
                  name: string;
                }>;
              };
              AddressDetails: {
                Country: {
                  AddressLine: string;
                  CountryNameCode: string;
                  CountryName: string;
                  AdministrativeArea: {
                    AdministrativeAreaName: string;
                    Locality: {
                      LocalityName: string;
                      Thoroughfare: {
                        ThoroughfareName: string;
                        Premise: {
                          PremiseNumber: string;
                          PostalCode: {
                            PostalCodeNumber: string;
                          };
                        };
                      };
                    };
                  };
                };
              };
            };
          };
          description: string;
          name: string;
          boundedBy: {
            Envelope: {
              lowerCorner: string;
              upperCorner: string;
            };
          };
          Point: {
            pos: string;
          };
        };
      }>;
    };
  };
};
