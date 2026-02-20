import {
  useQuery,
  useMutation,
  useQueryClient,
  MutationFunction,
} from '@tanstack/react-query'
import * as API from '../apis/savings.ts'

export function useSavings() {
  const query = useQuery({ queryKey: ['savings'], queryFn: API.getAllSavings })
  return {
    ...query,
    add: useAddSavings(),
    delete: useDeleteSavings(),
    update: useUpdateSavings(),
    addBulk: useAddBulkSavings(),
  }
}

export function useSavingsMutation<TData = unknown, TVariables = unknown>(
  mutationFn: MutationFunction<TData, TVariables>,
) {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['savings'] })
    },
  })
  return mutation
}

export function useAddSavings() {
  return useSavingsMutation(API.addSavings)
}

export function useDeleteSavings() {
  return useSavingsMutation(API.deleteSavings)
}

export function useUpdateSavings() {
  return useSavingsMutation(API.updateSavings)
}

export function useAddBulkSavings() {
  return useSavingsMutation(API.addBulkSavings)
}

export function useSaving() {
  const query = useQuery({ queryKey: ['saving'], queryFn: API.getAllSaving })
  return {
    ...query,
    byName: useSavingByName(),
    add: useAddSaving(),
    delete: useDeleteSaving(),
    update: useUpdateSaving(),
  }
}

export function useSavingMutation<TData = unknown, TVariables = unknown>(
  mutationFn: MutationFunction<TData, TVariables>,
) {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['savings'] })
    },
  })
  return mutation
}

export function useSavingByName() {
  return useSavingMutation(API.getSavingByName)
}

export function useAddSaving() {
  return useSavingMutation(API.addSaving)
}

export function useDeleteSaving() {
  return useSavingMutation(API.deleteSaving)
}

export function useUpdateSaving() {
  return useSavingsMutation(API.updateSaving)
}
