---
title: BPMN Aufgabe Notes
description: Learnings from BPMN test
---

## JavaScript < Typescript

This has been my first JavaScript project in years so it was interestin gto see how much I lean on typescript, and how much it helps in developing. The BPMN library is a very modern JS library which is great, but updating it to typescript would greatly improve it's useability. In it's current form I'd have to change the default tsconfig of a new Angular project and it would take even more work to get it to work in a Nuxt3 project. Which is why I chose Nuxt 2 as teh framework to work with.

## Great Documentation

the BPMN-JS library has great documentation and examples. Given enough time I'm sure I'd be able to complete all the tasks in the test.

## Adding the library and saving BPMN Modells

This was all very straight forward thanks to the great documentation and examples. I got the viewer up in no time and I spent more time making everything else look and work nicely than getting bpmn-js set up. There is also an example of saving an svg of the Model that I chose not to implement. You can create and save a workflow in the Modeller.

## Creating custom Shapes

editing the current shapes with colors and extra features works well. I was able to implement a few of the examples which you can see in the Modeler.

## Custom Events

ToDo

## Current Block

I'm currently stuck adding the Flask Icon to a custom Event. I've tried overriding the css and adding the icon to the before element in the Toolbar as well as prepending the svg. So far I can't get either approach to work.
