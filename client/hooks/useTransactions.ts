import {
  useQuery,
  useMutation,
  useQueryClient,
  MutationFunction,
} from '@tanstack/react-query'
import * as API from '../apis/transactions.ts'

export function useTransactions() {
  const query = useQuery({
    queryKey: ['transactions'],
    queryFn: API.getTransactions,
  })
  return {
    ...query,
    add: useAddTransaction(),
    delete: useDeleteTransaction(),
    update: useUpdateTransaction(),
  }
}

export function useTransactionMutation<TData = unknown, TVariables = unknown>(
  mutationFn: MutationFunction<TData, TVariables>,
) {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] })
    },
  })
  return mutation
}

export function useAddTransaction() {
  return useTransactionMutation(API.addTransaction)
}

export function useDeleteTransaction() {
  return useTransactionMutation(API.deleteTransaction)
}

export function useUpdateTransaction() {
  return useTransactionMutation(API.updateTransaction)
}
