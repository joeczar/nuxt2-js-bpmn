---
title: BPMN Aufgabe
description: Einbindung der BPMN-JS Bibliotech in Nuxt
---

## Aufgabe

Auf der heute gezeigten Website wird eine JavaScript-Bibliothek zur Erstellung von BPMN-Modellen bereitgestellt. Diese Bibliothek muss in eine eigene Anwendung eingebunden und um eigene Shapes und Eigenschaften erweitert werden. Schlussendlich sollen mit dem Workflow-Editor ärztliche Leitlinien abgebildet werden können, die in einer eigenen Workflow-Engine (Camunda) lauffähig sein sollen. Die Workflow-Engine ist in Java geschrieben und nicht Bestandteil der Aufgabe.

Einstiegspunkt zur Bibliothek: <https://bpmn.io/toolkit/bpmn-js/>

Der hier gezeigte Editor kann unter dem folgenden Link getestet werden: <https://demo.bpmn.io/new>

Ein einfacher Workflow kann wie folgt aussehen. Die erste Aufgabe/der erste Task „Name des Patienten prüfen“ ist ein manueller Task, der durch einen Benutzer ausgeführt werden muss. Der zweite Task „Patient speichern“ ist ein Service-Task, der automatisiert eine Funktion oder Nachricht (Rest, MQTT, RPC) ausführt.
![example](@/assets/1.png)

Hier der Projekt-Link zur JavaScript-Bibliothek mit Beispielen: <https://github.com/bpmn-io/bpmn-js>

## Folgende Themen müssten erarbeitet/umgesetzt werden

1. ☑ Wie sieht eine Einbindung der Bibliothek mit einen Technologie-Stack /Framework Deiner Wahl aus? Funktionsfähiges Demoprogramm zur Erstellung und Speicherung eines BPMN-Modells.
2. Wie kann man eigene Shapes definieren (die beiden Tasks oben sind Shapes, aber auch der Start- und Endknoten)? Beispielsweise benötigen wir einen Shape Event mit einem Erlenmeyerkolben als Symbol. [bpmn-js-example-custom-rendering](https://github.com/bpmn-io/bpmn-js-example-custom-rendering)
3. Wie kann man einen eigenen Eventhandler für die Shapes definieren? Ein Event könnte eine Alert-Box oder ein modales Fenster sein.

   - Beispiel-E-Mail-Event (Signal)

   - Erlenmeyerkolben (in schön gibt es den bestimmt auch irgendwo)

4. Wie kann man das Property Panel (Panel auf der rechten Seite) von Shapes erweitern (ist in der Demo nicht zu sehen, jedoch in der Doku des JavaScript-Frameworks)? Hier benötigen wir eigene Eigenschaften zu einem Shape. Als Beispiel könntest Du ein Textfeld einbauen.

Der Aufwand für diese Aufgabe sollte nicht mehr als 4 -5 Stunden betragen.
