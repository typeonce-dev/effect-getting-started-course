import { Context, Effect, Layer } from "effect";
import { PokeApiUrl, PokeApiUrlLive } from "./PokeApiUrl";

export type BuildPokeApiUrl = ({ name }: { name: string }) => string;

export const BuildPokeApiUrl =
  Context.GenericTag<BuildPokeApiUrl>("BuildPokeApiUrl");

export const BuildPokeApiUrlLive = Layer.effect(
  BuildPokeApiUrl,
  Effect.gen(function* () {
    const pokeApiUrl = yield* PokeApiUrl;
    return BuildPokeApiUrl.of(({ name }) => `${pokeApiUrl}/${name}`);
  })
).pipe(Layer.provide(PokeApiUrlLive));
