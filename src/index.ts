import { Effect, Layer, ManagedRuntime } from "effect";
import { BuildPokeApiUrlLive } from "./BuildPokeApiUrl";
import { PokeApi, PokeApiLive } from "./PokeApi";
import { PokeApiUrlLive } from "./PokeApiUrl";
import { PokemonCollectionLive } from "./PokemonCollection";

const MainLayer = Layer.mergeAll(
  PokeApiLive,
  PokemonCollectionLive,
  PokeApiUrlLive,
  BuildPokeApiUrlLive
);

const PokemonRuntime = ManagedRuntime.make(MainLayer);

export const program = Effect.gen(function* () {
  const pokeApi = yield* PokeApi;
  return yield* pokeApi.getPokemon;
});

const runnable = program.pipe(Effect.provide(MainLayer));

const main = runnable.pipe(
  Effect.catchTags({
    FetchError: () => Effect.succeed("Fetch error"),
    JsonError: () => Effect.succeed("Json error"),
    ParseError: () => Effect.succeed("Parse error"),
  })
);

PokemonRuntime.runPromise(main).then(console.log);
