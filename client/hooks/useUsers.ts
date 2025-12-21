import {
  useQuery,
  useMutation,
  useQueryClient,
  MutationFunction,
} from '@tanstack/react-query'
import * as API from '../apis/users.ts'

export function useGetUserById(userId: number) {
  return useQuery({
    queryKey: ['expenses'],
    queryFn: async () => {
      const response = await getUserById(userId)
      return response
    }
  })
}

export function useUsers() {
  const query = useQuery({ queryKey: ['users'], queryFn: API.getExpenses })
  return {
    ...query,
    add: useAddUser(),
    delete: useDeleteUser(),
  }
}

export function useUserMutation<TData = unknown, TVariables = unknown>(
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

export function useAddUser() {
  return useUserMutation(API.addUser)
}

export function useDeleteExpense() {
  return useUserMutation(API.deleteUser)
}
