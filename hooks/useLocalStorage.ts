import { useState } from 'react';

const useLocalStorage = <T>(
  key: string,
  initialValue: T
): [T, (v: T) => void] => {
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue || '';
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value: any) => {
    const valueToStore = value instanceof Function ? value(storedValue) : value;
    setStoredValue(valueToStore);
    window.localStorage.setItem(key, JSON.stringify(valueToStore));
  };

  return [storedValue, setValue];
};

export default useLocalStorage;
