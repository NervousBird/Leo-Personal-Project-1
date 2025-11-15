import {
  useQuery,
  useMutation,
  useQueryClient,
  MutationFunction,
} from '@tanstack/react-query'
import * as API from '../apis/expenses.ts'

export function useExpenses() {
  const query = useQuery({ queryKey: ['expenses'], queryFn: API.getExpenses })
  return {
    ...query,
    add: useAddExpense(),
    delete: useDeleteExpense(),
    update: useUpdateExpense(),
  }
}

export function useExpenseMutation<TData = unknown, TVariables = unknown>(
  mutationFn: MutationFunction<TData, TVariables>,
) {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expenses'] })
    },
  })
  return mutation
}

export function useAddExpense() {
  return useExpenseMutation(API.addExpense)
}

export function useDeleteExpense() {
  return useExpenseMutation(API.deleteExpense)
}

export function useUpdateExpense() {
  return useExpenseMutation(API.updateExpense)
}
