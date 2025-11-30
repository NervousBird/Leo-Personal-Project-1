import {
  useQuery,
  useMutation,
  useQueryClient,
  MutationFunction,
} from '@tanstack/react-query'
import * as API from '../apis/incomes.ts'

export function useIncomes() {
  const query = useQuery({ queryKey: ['incomes'], queryFn: API.getIncomes })
  return {
    ...query,
    add: useAddIncome(),
    delete: useDeleteIncome(),
    update: useUpdateIncome(),
    addBulk: useAddBulkIncome(),
  }
}

export function useIncomeMutation<TData = unknown, TVariables = unknown>(
  mutationFn: MutationFunction<TData, TVariables>,
) {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['incomes'] })
    },
  })
  return mutation
}

export function useAddIncome() {
  return useIncomeMutation(API.addIncome)
}

export function useDeleteIncome() {
  return useIncomeMutation(API.deleteIncome)
}

export function useUpdateIncome() {
  return useIncomeMutation(API.updateIncome)
}

export function useAddBulkIncome() {
  return useIncomeMutation(API.addBulkIncome)
}
