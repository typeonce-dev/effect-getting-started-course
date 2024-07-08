import { Console, Effect } from "effect";

const main = Console.log("Hello world");

Effect.runSync(main);
