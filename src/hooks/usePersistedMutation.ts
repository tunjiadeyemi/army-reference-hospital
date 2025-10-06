import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { UseMutationResult } from "@tanstack/react-query";

interface UsePersistedMutationOptions<TData, TError, TVariables> {
  mutationFn: (variables: TVariables) => Promise<TData>;
  invalidateKeys: string | string[]; // Query keys to invalidate on success
  onSuccessCallback?: (data: TData, variables: TVariables) => void;
  onErrorCallback?: (error: TError, variables: TVariables) => void;
}

// Overload signatures for backward compatibility
export function usePersistedMutation<TData = unknown, TError = Error, TVariables = void>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  invalidateKeys: string | string[],
  onSuccessCallback?: (data: TData, variables: TVariables) => void,
  onErrorCallback?: (error: TError, variables: TVariables) => void
): UseMutationResult<TData, TError, TVariables>;

export function usePersistedMutation<TData = unknown, TError = Error, TVariables = void>(
  options: UsePersistedMutationOptions<TData, TError, TVariables>
): UseMutationResult<TData, TError, TVariables>;

// Implementation
export function usePersistedMutation<TData = unknown, TError = Error, TVariables = void>(
  mutationFnOrOptions:
    | ((variables: TVariables) => Promise<TData>)
    | UsePersistedMutationOptions<TData, TError, TVariables>,
  invalidateKeys?: string | string[],
  onSuccessCallback?: (data: TData, variables: TVariables) => void,
  onErrorCallback?: (error: TError, variables: TVariables) => void
): UseMutationResult<TData, TError, TVariables> {
  const queryClient = useQueryClient();

  // Normalize parameters to options object
  const options: UsePersistedMutationOptions<TData, TError, TVariables> =
    typeof mutationFnOrOptions === "function"
      ? {
          mutationFn: mutationFnOrOptions,
          invalidateKeys: invalidateKeys as string | string[],
          onSuccessCallback,
          onErrorCallback,
        }
      : mutationFnOrOptions;

  const {
    mutationFn,
    invalidateKeys: keysToInvalidate,
    onSuccessCallback: onSuccess,
    onErrorCallback: onError,
  } = options;

  const mutation = useMutation<TData, TError, TVariables>({
    mutationFn,
    onSuccess: (data, variables) => {
      // Invalidate queries to trigger refetch
      const keys = Array.isArray(keysToInvalidate) ? keysToInvalidate : [keysToInvalidate];
      
      keys.forEach((key) => {
        queryClient.invalidateQueries({ queryKey: [key] });
      });

      // Call custom success callback if provided
      if (onSuccess) {
        onSuccess(data, variables);
      }
    },
    onError: (error, variables) => {
      // Call custom error callback if provided
      if (onError) {
        onError(error, variables);
      }
    },
  });

  return mutation;
}

// Utility types for common mutation operations
export type CreateMutationFn<TData, TVariables> = (variables: TVariables) => Promise<TData>;
export type UpdateMutationFn<TData, TVariables> = (variables: TVariables) => Promise<TData>;
export type DeleteMutationFn<TVariables> = (variables: TVariables) => Promise<void>;