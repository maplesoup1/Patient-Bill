import { useEffect, useRef } from 'react';

interface UseClickOutsideOptions {
  onClickOutside: () => void;
  enabled?: boolean;
}

export function useClickOutside<T extends HTMLElement = HTMLElement>({
  onClickOutside,
  enabled = true,
}: UseClickOutsideOptions) {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!enabled) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClickOutside();
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClickOutside();
      }
    };

    // 添加事件监听器
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscapeKey);

    // 清理函数
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [onClickOutside, enabled]);

  return ref;
}