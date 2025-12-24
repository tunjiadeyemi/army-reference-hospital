import { useQuery } from "@tanstack/react-query";
import type { UseQueryResult} from "@tanstack/react-query";
import { useEffect } from "react";

interface UsePersistedQueryOptions<T> {
  key: string;
  queryFn: () => Promise<T>;
  setStoreValue: (data: T) => void;
  currentStoreValue?: T;
  staleTime?: number;
  gcTime?: number;
  enabled?:boolean
}

// Overload signatures for backward compatibility
export function usePersistedQuery<T>(
  key: string,
  queryFn: (id?:number) => Promise<T>,
  setStoreValue: (data: T) => void,
  currentStoreValue?: T
): UseQueryResult<T, Error>;

export function usePersistedQuery<T>(
  options: UsePersistedQueryOptions<T>
): UseQueryResult<T, Error>;

// Implementation
export function usePersistedQuery<T>(
  keyOrOptions: string | UsePersistedQueryOptions<T>,
  queryFn?: () => Promise<T>,
  setStoreValue?: (data: T) => void,
  currentStoreValue?: T
): UseQueryResult<T, Error> {
  // Normalize parameters to options object
  const options: UsePersistedQueryOptions<T> =
    typeof keyOrOptions === "string"
      ? {
          key: keyOrOptions,
          queryFn: queryFn as () => Promise<T>,
          setStoreValue: setStoreValue as (data: T) => void,
          currentStoreValue,
          staleTime: 5 * 60 * 1000,
          gcTime: 10 * 60 * 1000,
        }
      : keyOrOptions;

  const {
    key,
    queryFn: fn,
    setStoreValue: setter,
    currentStoreValue: storeValue,
    staleTime = 5 * 60 * 1000,
    gcTime = 10 * 60 * 1000,
  } = options;
  const query = useQuery<T, Error>({
    queryKey: [key],
    queryFn: fn,
    enabled:options.enabled ?? !storeValue,
    staleTime,
    gcTime,
    initialData: storeValue,
  });

  // Persist data when it changes
  useEffect(() => {
    if (query.data && query.isSuccess) {
      setter(query.data);
      localStorage.setItem(key, JSON.stringify(query.data));
    }
  }, [query.data, query.isSuccess, key, setter]);

  return query;
}

// Alternative version without localStorage (if you want store-only persistence)
export function usePersistedQueryStoreOnly<T>({
  key,
  queryFn,
  setStoreValue,
  currentStoreValue,
  staleTime = 5 * 60 * 1000,
  gcTime = 10 * 60 * 1000,
}: UsePersistedQueryOptions<T>): UseQueryResult<T, Error> {
  const query = useQuery<T, Error>({
    queryKey: [key],
    queryFn,
    enabled: !currentStoreValue,
    staleTime,
    gcTime,
    initialData: currentStoreValue,
  });

  useEffect(() => {
    if (query.data && query.isSuccess) {
      setStoreValue(query.data);
    }
  }, [query.data, query.isSuccess, setStoreValue]);

  return query;
}