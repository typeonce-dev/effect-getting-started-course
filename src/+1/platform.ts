import {
  FetchHttpClient,
  HttpClient,
  HttpClientRequest,
  HttpClientResponse,
} from "@effect/platform";
import { Effect, flow } from "effect";
import { Pokemon } from "../schemas";

export const main = Effect.gen(function* () {
  const baseClient = yield* HttpClient.HttpClient;
  const pokeApiClient = baseClient.pipe(
    HttpClient.mapRequest(
      flow(
        HttpClientRequest.acceptJson,
        HttpClientRequest.prependUrl("https://pokeapi.co/api/v2")
      )
    )
  );

  return yield* pokeApiClient.get("/pokemon/squirtle");
}).pipe(
  Effect.flatMap(HttpClientResponse.schemaBodyJson(Pokemon)),
  Effect.scoped,
  Effect.provide(FetchHttpClient.layer)
);
