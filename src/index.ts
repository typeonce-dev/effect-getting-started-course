import { Effect, Layer, ManagedRuntime } from "effect";
import { BuildPokeApiUrl } from "./BuildPokeApiUrl";
import { PokeApi } from "./PokeApi";
import { PokeApiUrl } from "./PokeApiUrl";
import { PokemonCollection } from "./PokemonCollection";

const MainLayer = Layer.mergeAll(
  PokeApi.Test,
  PokemonCollection.Live,
  BuildPokeApiUrl.Live,
  PokeApiUrl.Live
);

const PokemonRuntime = ManagedRuntime.make(MainLayer);

export const program = Effect.gen(function* () {
  const pokeApi = yield* PokeApi;
  return yield* pokeApi.getPokemon;
});

const main = program.pipe(
  Effect.catchTags({
    FetchError: () => Effect.succeed("Fetch error"),
    JsonError: () => Effect.succeed("Json error"),
    ParseError: () => Effect.succeed("Parse error"),
  })
);

PokemonRuntime.runPromise(main).then(console.log);
