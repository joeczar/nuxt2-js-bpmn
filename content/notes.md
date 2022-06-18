---
title: BPMN Aufgabe Notes
description: Learnings from BPMN test
---

## JavaScript < Typescript

This has been my first JavaScript project in years so it was interesting to see how much I lean on typescript, and how much it helps in developing. The BPMN library is a very modern JS library which is great, but updating it to typescript would greatly improve it's useability. In it's current form I'd have to change the default tsconfig of a new Angular project and it would take even more work to get it to work in a Nuxt3 project. Which is why I chose Nuxt 2 as teh framework to work with.

## Great Documentation

the BPMN-JS library has great documentation and examples. Given enough time I'm sure I'd be able to complete all the tasks in the test.

## Adding the library and saving BPMN Modells

This was all very straight forward thanks to the great documentation and examples. I got the viewer up in no time and I spent more time making everything else look and work nicely than getting bpmn-js set up. There is also an example of saving an svg of the Model that I chose not to implement. You can create and save a workflow in the Modeller.

## Creating custom Shapes

editing the current shapes with colors and extra features works well. I was able to implement a few of the examples which you can see in the Modeler.

- Was able to get the Flask to show on the blue event. There are a few different ways this could be done according to the docs.

## Custom Events

ToDo

## Custom pallet elements

I was able to create several different types of events that are selectable in the pallet. In order to create a textfield element it would be the same process. You need to create a custom renderer, a custom pallette and a custom context pad which extends the current model. I had hoped you could then add as many of these custom elements as you wanted, so far this does not seem to be the case.

I would next look into extending the elementFactory to create new shapes and tasks.

## Takeaways

I would strongly recommend starting out by Typescripting the library. This should be done as an open-source project ideally in cooperation with the library Author. This would be beneficial for everyone by increasing the useability of the library for everyone, and you would gain deep knowledge of it to use in your projects.

- [Current stand on TS for BPMN-JS](https://github.com/bpmn-io/bpmn-js/issues/1002)
- [External typings for BPMN-JS](https://github.com/lppedd/bpmnio-typings)

After reading through the issues connected with typescript, it may now be possible with a little work to use it as is. However, out of the box it doesn't work in Angular or Nuxt3.
