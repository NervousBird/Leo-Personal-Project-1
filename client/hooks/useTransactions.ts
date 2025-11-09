import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  getTransactions,
  addTransaction,
  deleteTransaction,
  updateTransaction,
} from '../apis/transactions.ts'
import { Transaction, TransactionObject } from '../../models/transactions.ts'

export function useTransactions() {
  const query = useQuery({
    queryKey: ['transactions'],
    queryFn: getTransactions,
  })
  return {
    ...query,
    // Extra queries go here e.g. addFruit: useAddFruit()
  }
}

export function useAddTransaction() {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: async (data: TransactionObject) => {
      await addTransaction(data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] })
    },
  })

  return mutation
}

export function useDeleteTransaction() {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: async (id: Transaction) => {
      await deleteTransaction(id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] })
    },
  })

  return mutation
}

export function useUpdateTransaction() {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: async (data: Transaction) => {
      await updateTransaction(data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] })
    },
  })

  return mutation
}
// Query functions go here e.g. useAddFruit
/* function useAddFruit() {
  return useFruitsMutation(addFruit)
} */
