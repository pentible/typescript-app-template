import { useRef } from "react";

/**
 * Hook to initialize and return a constant value. Unlike `useMemo`, this is guaranteed to
 * always return the same value (and if the initializer is a function, only call it once).
 * This is similar to setting a private member in a class constructor.
 *
 * If the value should ever change based on dependencies, use `useMemo` instead.
 *
 * @param initialValue - Initial value, or function to get the initial value. Similar to `useState`,
 * only the value/function passed in the first time this is called is respected.
 * @returns The value. The identity of this value will always be the same.
 */
export function useConst<T>(initialValue: () => T): T {
    // Use useRef to store the value because it's the least expensive built-in hook that works here
    // (we could also use `const [value] = useState(initialValue)` but that's more expensive
    // internally due to reducer handling which we don't need)
    const ref = useRef<{ value: T }>(undefined);

    if (ref.current === undefined) {
        // Box the value in an object so we can tell if it's initialized even if the initializer
        // returns/is undefined
        ref.current = { value: initialValue() };
    }

    return ref.current.value;
}
