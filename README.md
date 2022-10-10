# Angular Testing

Aplicación de ejemplo para el [curso de Angular Testing de TrainingIT](https://www.trainingit.es/index.php/producto/curso-angular-testing/).

> ⚠️ Mantén siempre iniciado el servidor API. Ejecuta `npm run api` en una terminal

### Recomendación de uso mientras estudias:

> Code along

Clona este proyecto y aplica los cambios sobre la rama `main` según lo explicado en los videos. También puedes hacer esto en una rama tuya.

Visita las distintas ramas del proyecto para comprobar los cambios graduales

[Ramas para cada video lección](https://github.com/Angular-Testing/angular-testing/branches)

> Ejemplo: `git checkout 0.1-jasmine-karma`

---

## Manage budgets for projects.

### Sample app for learning Angular testing

This sample project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.0.

[Read CLI docs](https://github.com/Angular-Testing/angular-testing/blob/main/docs/cli.md) to see how it was generated.

Run `npm i` after clone or fork

## Workflows

Run `npm start` for a dev server.

Run `npm run api` for a dev only api server

Run `npm test` to execute the unit tests via [Karma](https://karma-runner.github.io).

Run `npm run lint` to fix or report lint failures

Run `npm run release` to create a new release with semantic versions and a change file

Run `npm run deploy` to deploy to gitHub Pages

## Architecture

Simple repository, organized in modules grouped in three main folders categories:

### Core

- _Global_ and _Layout_ Modules to contain services with app wide related logic

### Shared

- _Data, UI, Util_ modules to hold components, directives, pipes, services or logic to be shared in pages

### Domain

- _Feature_ modules for page components lazy loaded by routes

## Functionality

Basic CRUD for a list of projects. Each one with dates, status and budgeting control info.

### To Be extended

> To be done at the classroom or used like an exercise by the student.

- A project should have a list of tasks to be done.
- A project should have a list of economic transactions.

## Credits

Cloned from [angular-budget](https://github.com/Angular-Testing/angular-testing/)
Created by [Alberto Basalo](https://twitter.com/albertobasalo) to be used as a sample in his Angular Courses.
