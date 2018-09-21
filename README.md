# Gameboi
Gameboi is a work-in-progress Game Boy emulator, written in Javascript. It
consists of a Node.JS backend, which does all the heavy work and accurate
timing, and an Electron frontend, which receives rendering instructions from
the backend via IPC and renders the screen in a HTML canvas. Furthermore, it
catches input from the user and sends it to the backend. This setup is not
implemented yet and may not work at all.

Tests are done using Mocha and can be found in `tests/`. The test suite is far
from complete though.

## Contributing
Gameboi is a personal side project and thus I am not (yet) accepting
contributions from others. However, as it's MIT-licensed, you are free to fork
the project and make modifications of your own, as long as you adhere to the
license.

## Motivation
🤔
