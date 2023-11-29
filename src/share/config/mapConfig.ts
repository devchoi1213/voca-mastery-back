import { registerAs } from "@nestjs/config";

export default registerAs("map", () => ({
  restKey: process.env.MAP_REST_KEY,
  restEndpoint: process.env.MAP_REST_ENDPOINT,
}));
