import { ConfigProvider, Effect, Layer } from "effect";
import { afterAll, afterEach, beforeAll, expect, it } from "vitest";
import { server } from "../test/node";
import { PokeApi } from "./PokeApi";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const TestConfigProvider = ConfigProvider.fromMap(
  new Map([["BASE_URL", "http://localhost:3000"]])
);

const ConfigProviderLayer = Layer.setConfigProvider(TestConfigProvider);
const MainLayer = PokeApi.Live.pipe(Layer.provide(ConfigProviderLayer));

const program = Effect.gen(function* () {
  const pokeApi = yield* PokeApi;
  return yield* pokeApi.getPokemon;
});

const main = program.pipe(Effect.provide(MainLayer));

it("returns a valid pokemon", async () => {
  const response = await Effect.runPromise(main);
  expect(response).toEqual({
    id: 1,
    height: 10,
    weight: 10,
    order: 1,
    name: "myname",
  });
});
