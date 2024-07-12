import { Config, Context, Effect, Layer } from "effect";

export type PokeApiUrl = string;

export const PokeApiUrl = Context.GenericTag<PokeApiUrl>("PokeApiUrl");

export const PokeApiUrlLive = Layer.effect(
  PokeApiUrl,
  Effect.gen(function* () {
    const baseUrl = yield* Config.string("BASE_URL");
    return PokeApiUrl.of(`${baseUrl}/api/v2/pokemon`);
  })
);
