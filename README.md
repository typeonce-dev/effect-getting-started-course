# Effect: Beginners Complete Getting Started

This repository contains all the code for the course [`Effect: Beginners Complete Getting Started`](https://www.typeonce.dev/course/effect-beginners-complete-getting-started).

The app is implemented using typescript. You can get started by forking/cloning the repository and installing the dependencies:

```sh
pnpm install
```

The project follows the implementation of the app in the course:
- Entry point inside [index.ts](./src/index.ts)
- All *Pascal Case* files in [src](./src/) are effect services
- Testing inside [test](./test/)
- [[+1]](./src/+1/) contains topic explained inside extra lessons in the course

***

[`effect`](https://effect.website/) is the missing standard library for TypeScript. `effect` provides everything that you need to **build type-safe production typescript applications**.

## Course content

This course will guide you from 0 knowledge of `effect` to build your first API with `Runtime`, `Layer`, `Config` and more. It shows you *how to implement a single API request* using `effect`.

This may sound simple, but in reality you need to account for a lot of configurations and possible errors. `effect` makes everything type-safe, maintainable, testable:
- Error handling
- Configuration (environmental variables)
- Mocking and testing (dependency injection)
- Organizing and composing services

### How the course is organized

The course is organized in small self-contained lessons. Each lesson introduces 1 single new concept.

We will explore why using plain `fetch` and `Promise` is not enough. For each problem we explore the solution offered by `effect`, how it works, why it's needed, and how it integrates with the other modules to build a complete app.

## Course outline

These are some of the concepts you will learn:
- Creating and running effects (`Effect` type)
- Type safe error handling
- How to use `pipe` and `gen` to compose effects
- How to use `@effect/schema` to parse request responses
- Manage environmental variables with the `Config` module
- Testing and mocking using dependency injection
- Composing services using `Context` and `Layer`
- How to build your custom runtime using `ManagedRuntime`

We will learn these step by step. Every new module or API will be introduced only when required, specifically when implementing a missing feature of solving a problem with the app.

***

## Prerequisites
The only prerequisite is knowing typescript.

This does not require being advanced in the language. Nonetheless, the course assumes you know *what types are and how they work*.

Here are some of the typescript concepts we are going to use:
- Type inference
- `typeof`
- `never`
- `interface`/`type`
- `readonly`
- `function*`/`yield*`

We will briefly review some of these during the course to understand how and why they are used.

### Good to have
Some patterns and APIs in `effect` derive from functional programming principles.

Those are **not** required, but they may help you better understand some APIs used in `effect`:
- Piping: `pipe` function in `effect`
- Pure functions
- Function composition
- High-order functions
- Pattern matching
- Dependency injection

> We are going to learn more about some of these principles during the course