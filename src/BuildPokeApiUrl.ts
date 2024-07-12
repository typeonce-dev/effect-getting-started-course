import { Context, Effect } from "effect";
import { PokeApiUrl } from "./PokeApiUrl";

export type BuildPokeApiUrl = ({ name }: { name: string }) => string;

export const BuildPokeApiUrl =
  Context.GenericTag<BuildPokeApiUrl>("BuildPokeApiUrl");

export const BuildPokeApiUrlLive = Effect.gen(function* () {
  const pokeApiUrl = yield* PokeApiUrl;
  return BuildPokeApiUrl.of(({ name }) => `${pokeApiUrl}/${name}`);
});
