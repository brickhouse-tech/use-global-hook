# @znemz/use-global-hook

[![npm version](https://img.shields.io/npm/v/@znemz/use-global-hook.svg)](https://www.npmjs.com/package/@znemz/use-global-hook)
[![build status](https://img.shields.io/travis/nmccready/use-global-hook.svg)](https://travis-ci.org/nmccready/use-global-hook)
[![Test coverage](https://coveralls.io/repos/github/nmccready/use-global-hook/badge.svg)](https://coveralls.io/github/nmccready/use-global-hook?branch=master)
[![GitHub stars](https://img.shields.io/github/stars/nmccready/use-global-hook.svg?style=social)](https://github.com/nmccready/use-global-hook)

**Easy state management for React using hooks — less than 1KB.**

No Redux. No Context boilerplate. Just a hook that shares state across components.

## Install

```bash
npm install @znemz/use-global-hook
# or
yarn add @znemz/use-global-hook
```

## Quick Start

```javascript
import React from 'react';
import useGlobalHook from '@znemz/use-global-hook';

const initialState = {
  counter: 0,
};

const actions = {
  addToCounter: (store, amount) => {
    const newCounterValue = store.state.counter + amount;
    store.setState({ counter: newCounterValue });
  },
};

const useGlobal = useGlobalHook({ React, initialState, actions });

const App = () => {
  const [globalState, globalActions] = useGlobal();
  return (
    <div>
      <p>counter: {globalState.counter}</p>
      <button type="button" onClick={() => globalActions.addToCounter(1)}>
        +1 to global
      </button>
    </div>
  );
};

export default App;
```

## Live Examples

### [Several counters, one value](https://codesandbox.io/s/v6zz2nwow5)

Add as many counters as you want — they all share the same global value. Every time one counter increments, all counters re-render. The parent component won't render again.

### [Asynchronous ajax requests](https://codesandbox.io/s/wqvykj5497)

Search GitHub repos by username. Handle the ajax request asynchronously with async/await. Update the requests counter on every search.

## Advanced Usage

### [`setRef` vs `setState`](https://codepen.io/nmccready/pen/vYBgrGR)

Sometimes you need to set a reference and wipe the state clean. Common use cases:

- **Reset / wipe** — clear state without triggering re-renders
- **Tracking DOM elements** — `ref={setRef}`

### Why React Injection?

This library accepts React as a parameter, which allows:

- Support for different React implementations
- Use of alternative hook implementations (e.g. [reinspect](https://github.com/troch/reinspect) for Redux DevTools integration)
- Testing with mock React objects

## API

### `useGlobalHook({ React, initialState, actions })`

Returns a hook function that provides `[state, actions]` when called in a component.

| Parameter | Type | Description |
|-----------|------|-------------|
| `React` | object | Your React instance |
| `initialState` | object | Initial global state |
| `actions` | object | Action functions receiving `(store, ...args)` |

### Store Methods

| Method | Description |
|--------|-------------|
| `store.setState(newState)` | Merge new state and trigger re-renders |
| `store.setRef(newRef)` | Set reference without triggering re-renders |

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## Sponsor

If you find this project useful, consider [sponsoring @nmccready](https://github.com/sponsors/nmccready) to support ongoing maintenance and development. ❤️

## License

See [LICENSE](./LICENSE) for details.
