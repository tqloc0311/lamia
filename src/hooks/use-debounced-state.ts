import { useState, useEffect, useCallback } from 'react';
import { debounce } from 'lodash';

function useDebouncedState<T>(initialValue: T, delay: number) {
  const [value, setValue] = useState<T>(initialValue);
  const [debouncedValue, setDebouncedValue] = useState<T>(initialValue);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSetValue = useCallback(
    debounce((newValue: T) => {
      setDebouncedValue(newValue);
    }, delay),
    [delay],
  );

  useEffect(() => {
    debouncedSetValue(value);

    return () => {
      debouncedSetValue.cancel();
    };
  }, [debouncedSetValue, value]);

  return [value, debouncedValue, setValue] as const;
}

export default useDebouncedState;
