import { Schema, type ParseResult } from "@effect/schema";
import { Config, Context, Effect } from "effect";
import type { ConfigError } from "effect/ConfigError";
import type { FetchError, JsonError } from "./errors";
import { Pokemon } from "./schemas";

export interface PokeApi {
  readonly getPokemon: Effect.Effect<
    typeof Pokemon.Type,
    FetchError | JsonError | ParseResult.ParseError | ConfigError
  >;
}

export const PokeApi = Context.GenericTag<PokeApi>("PokeApi");

export const PokeApiLive = PokeApi.of({
  getPokemon: Effect.gen(function* () {
    const baseUrl = yield* Config.string("BASE_URL");

    const response = yield* Effect.tryPromise({
      try: () => fetch(`${baseUrl}/api/v2/pokemon/garchomp/`),
      catch: (): FetchError => ({ _tag: "FetchError" }),
    });

    if (!response.ok) {
      return yield* Effect.fail<FetchError>({ _tag: "FetchError" });
    }

    const json = yield* Effect.tryPromise({
      try: () => response.json(),
      catch: (): JsonError => ({ _tag: "JsonError" }),
    });

    return yield* Schema.decodeUnknown(Pokemon)(json);
  }),
});

export const PokeApiTest = PokeApi.of({
  getPokemon: Effect.gen(function* () {
    const response = yield* Effect.tryPromise({
      try: () => fetch(`http://localhost:3000/api/v2/pokemon/garchomp/`),
      catch: (): FetchError => ({ _tag: "FetchError" }),
    });

    if (!response.ok) {
      return yield* Effect.fail<FetchError>({ _tag: "FetchError" });
    }

    const json = yield* Effect.tryPromise({
      try: () => response.json(),
      catch: (): JsonError => ({ _tag: "JsonError" }),
    });

    return yield* Schema.decodeUnknown(Pokemon)(json);
  }),
});
