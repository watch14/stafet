'use client';

import { useState, useCallback } from 'react';

interface UseLoadingReturn {
  isLoading: boolean;
  startLoading: (message?: string) => void;
  stopLoading: () => void;
  setLoadingMessage: (message: string) => void;
  loadingMessage: string;
}

export function useLoading(initialMessage = 'Loading...'): UseLoadingReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState(initialMessage);

  const startLoading = useCallback((message?: string) => {
    if (message) {
      setLoadingMessage(message);
    }
    setIsLoading(true);
  }, []);

  const stopLoading = useCallback(() => {
    setIsLoading(false);
  }, []);

  const updateLoadingMessage = useCallback((message: string) => {
    setLoadingMessage(message);
  }, []);

  return {
    isLoading,
    startLoading,
    stopLoading,
    setLoadingMessage: updateLoadingMessage,
    loadingMessage,
  };
}

// Hook for async operations with loading states
export function useAsyncLoading() {
  const { isLoading, startLoading, stopLoading, setLoadingMessage, loadingMessage } = useLoading();

  const executeWithLoading = useCallback(async <T>(
    asyncFn: () => Promise<T>,
    loadingMsg?: string
  ): Promise<T> => {
    try {
      startLoading(loadingMsg);
      const result = await asyncFn();
      return result;
    } finally {
      stopLoading();
    }
  }, [startLoading, stopLoading]);

  return {
    isLoading,
    executeWithLoading,
    setLoadingMessage,
    loadingMessage,
  };
}
