import { Config, Context, Effect } from "effect";

export type PokeApiUrl = string;

export const PokeApiUrl = Context.GenericTag<PokeApiUrl>("PokeApiUrl");

export const PokeApiUrlLive = Effect.gen(function* () {
  const baseUrl = yield* Config.string("BASE_URL");
  return PokeApiUrl.of(`${baseUrl}/api/v2/pokemon`);
});
