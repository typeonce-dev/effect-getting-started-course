import {
  HttpClient,
  HttpClientRequest,
  HttpClientResponse,
} from "@effect/platform";
import { Pokemon } from "../schemas";

export const main = HttpClientRequest.get(
  "https://pokeapi.co/api/v2/pokemon/squirtle"
).pipe(
  HttpClient.fetchOk.pipe(
    HttpClient.mapEffect(HttpClientResponse.schemaBodyJson(Pokemon))
  )
);
