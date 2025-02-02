import { Key, useEffect } from "react";

export const useKeyDown = (key: Key, cb: () => void) => {
  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if (event.key !== key) return;
      cb();
    };

    window.addEventListener("keydown", listener);
    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, [key, cb]);
};
