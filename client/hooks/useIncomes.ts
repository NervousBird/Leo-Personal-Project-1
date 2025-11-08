import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { addIncome, deleteIncome, getIncomes } from '../apis/incomes.ts'
import { Income, IncomeObject } from '../../models/incomes.ts'

export function useIncomes() {
  const query = useQuery({ queryKey: ['incomes'], queryFn: getIncomes })
  return {
    ...query,
    // Extra queries go here e.g. addFruit: useAddFruit()
  }
}

export function useAddIncome() {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: async (data: IncomeObject) => {
      await addIncome(data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['incomes'] })
    },
  })

  return mutation
}

export function useDeleteIncome() {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: async (id: Income) => {
      await deleteIncome(id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['incomes'] })
    },
  })

  return mutation
}

// Query functions go here e.g. useAddFruit
/* function useAddFruit() {
  return useFruitsMutation(addFruit)
} */
