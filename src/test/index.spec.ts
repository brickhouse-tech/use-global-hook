import React, { useEffect } from 'react';
import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';

import useGlobalHook, { HookWork, Store } from '..';
import {
  SomeState,
  NestedState,
  NestedOuterActions,
  NestedInnerActions,
  subsetActions,
} from '.';

describe('useGlobalHook', () => {
  describe('default actions', () => {
    describe('setState', () => {
      it('works - single listener', () => {
        const useTest = useGlobalHook<SomeState>({ React, initialState: { a: undefined } });
        const { result } = renderHook(() => useTest());

        act(() => {
          result.current[1].setState({ a: 'a' });
        });

        expect(result.current[0].a).toEqual('a');
      });

      it('skip digest', () => {
        const useTest = useGlobalHook<SomeState>({ React, initialState: { a: undefined } });
        const { result } = renderHook(() => useTest());

        act(() => {
          result.current[1].setState({ a: 'a' }, false);
        });

        expect(result.current[0].a).toEqual(undefined);
      });

      it('initializer', () => {
        const initializer = (store: Store<SomeState>) => {
          store.setState({ a: 'a' });
        };
        const useTest = useGlobalHook<SomeState>({
          React,
          initialState: { a: undefined },
          initializer,
        });
        const { result } = renderHook(() => useTest());

        expect(result.current[0].a).toEqual('a');
      });

      it('works - multi listener', () => {
        const useTest = useGlobalHook<SomeState>({ React, initialState: { a: undefined } });
        const { result } = renderHook(() => useTest());
        const { result: result2 } = renderHook(() => useTest());

        act(() => {
          result.current[1].setState({ a: 'a' });
        });

        expect(result.current[0].a).toEqual('a');
        expect(result2.current[0].a).toEqual('a');
      });
    });

    describe('setRef', () => {
      it('works', () => {
        const useTest = useGlobalHook<SomeState>({ React, initialState: { a: undefined } });
        const { result } = renderHook(() => useTest());
        const ref = { a: 'a' };

        act(() => {
          result.current[1].setRef(ref);
        });

        expect(result.current[0]).toBe(ref);
      });

      it('skip digest', () => {
        const useTest = useGlobalHook<SomeState>({ React, initialState: { a: undefined } });
        const { result } = renderHook(() => useTest());

        act(() => {
          result.current[1].setRef({ a: 'a' }, false);
        });

        expect(result.current[0].a).toEqual(undefined);
      });
    });

    describe('hookWork', () => {
      it('does not complain for ts typing', () => {
        useGlobalHook<SomeState>({ React });
      });

      it('hookWork is called', () => {
        const useTest = useGlobalHook<SomeState>({ React });

        const hookWork = vi.fn();

        renderHook(() => {
          useTest(hookWork);
        });

        expect(hookWork).toHaveBeenCalled();
      });

      it('hookWork is called, other Hooks', () => {
        const useTest = useGlobalHook<SomeState>({ React });

        const effectFn = vi.fn();
        const hookWork = vi.fn(() => {
          useEffect(() => {
            effectFn();
          }, []);
        }) as HookWork;

        renderHook(() => {
          useTest(hookWork);
        });

        expect(hookWork).toHaveBeenCalled();
        expect(effectFn).toHaveBeenCalled();
      });
    });
  });
  describe('custom actions', () => {
    it('works - single listener', () => {
      const useTest = useGlobalHook<NestedState, NestedInnerActions, NestedOuterActions>({
        React,
        initialState: { a: undefined, subset: { b: 'hi' } },
        actions: subsetActions,
      });
      const { result } = renderHook(() => useTest());

      act(() => {
        result.current[1].setA('a');
        result.current[1].subset.setB('b');
      });

      expect(result.current[0].a).toEqual('a');
      expect(result.current[0].subset.b).toEqual('b');
    });
  });
});
