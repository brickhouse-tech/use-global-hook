# @znemz/use-global-hook

[![npm version](https://img.shields.io/npm/v/@znemz/use-global-hook.svg)](https://www.npmjs.com/package/@znemz/use-global-hook)
[![tests](https://github.com/brickhouse-tech/use-global-hook/actions/workflows/tests.yml/badge.svg)](https://github.com/brickhouse-tech/use-global-hook/actions/workflows/tests.yml)
[![GitHub stars](https://img.shields.io/github/stars/brickhouse-tech/use-global-hook.svg?style=social)](https://github.com/brickhouse-tech/use-global-hook)

**Easy state management for React using hooks — less than 1KB.**

No Redux. No Context boilerplate. Just a hook that shares state across components.

## Install

```bash
npm install @znemz/use-global-hook
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

## Advanced Usage

### `setRef` vs `setState`

Sometimes you need to set a reference and wipe the state clean. Common use cases:

- **Reset / wipe** — clear state without triggering re-renders
- **Tracking DOM elements** — `ref={setRef}`

```javascript
const useGlobal = useGlobalHook({ React, initialState: { data: null } });

// In a component:
const [state, actions] = useGlobal();

// setState merges (like React's setState)
actions.setState({ data: { key: 'value' } });

// setRef replaces the entire reference
actions.setRef({ completely: 'new object' });
```

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
| `store.setRef(newRef)` | Replace state reference and trigger re-renders |

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (using [conventional commits](https://www.conventionalcommits.org/))
4. Push to the branch
5. Open a Pull Request

## Sponsor

If you find this project useful, consider [sponsoring @nmccready](https://github.com/sponsors/nmccready) to support ongoing maintenance and development. ❤️

## License

See [LICENSE](./LICENSE) for details.
