import { Schema } from "@effect/schema";
import { Context, Effect } from "effect";
import { BuildPokeApiUrl } from "./BuildPokeApiUrl";
import type { FetchError, JsonError } from "./errors";
import { PokemonCollection } from "./PokemonCollection";
import { Pokemon } from "./schemas";

const make = {
  getPokemon: Effect.gen(function* () {
    const pokemonCollection = yield* PokemonCollection;
    const buildPokeApiUrl = yield* BuildPokeApiUrl;

    const requestUrl = buildPokeApiUrl({ name: pokemonCollection[0] });

    const response = yield* Effect.tryPromise({
      try: () => fetch(requestUrl),
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
};

type PokeApi = typeof make;

export const PokeApi = Context.GenericTag<PokeApi>("PokeApi");

export const PokeApiLive = PokeApi.of(make);

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
