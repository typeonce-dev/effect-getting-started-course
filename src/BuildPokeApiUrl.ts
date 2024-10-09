import { Effect } from "effect";
import { PokeApiUrl } from "./PokeApiUrl";

export class BuildPokeApiUrl extends Effect.Service<BuildPokeApiUrl>()(
  "BuildPokeApiUrl",
  {
    effect: Effect.gen(function* () {
      const pokeApiUrl = yield* PokeApiUrl;
      return ({ name }: { name: string }) => `${pokeApiUrl}/${name}`;
    }),
    dependencies: [PokeApiUrl.Live],
  }
) {}
