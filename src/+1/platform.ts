import {
  FetchHttpClient,
  HttpClient,
  HttpClientResponse,
} from "@effect/platform";
import { Effect } from "effect";
import { Pokemon } from "../schemas";

export const main = HttpClient.get(
  "https://pokeapi.co/api/v2/pokemon/squirtle"
).pipe(
  Effect.flatMap(HttpClientResponse.schemaBodyJson(Pokemon)),
  Effect.scoped,
  Effect.provide(FetchHttpClient.layer)
);
