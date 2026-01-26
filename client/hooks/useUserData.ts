import {
  useQuery,
  useMutation,
  useQueryClient,
  MutationFunction,
} from '@tanstack/react-query'
import * as API from '../apis/userData.ts'

export function useUserData() {
  const query = useQuery({ queryKey: ['user_data'], queryFn: API.getUserData})
  return {
    ...query,
    update: useUpdateUserData(),
  }
}

export function useUserDataMutation<TData = unknown, TVariables = unknown>(
  mutationFn: MutationFunction<TData, TVariables>,
) {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user_data'] })
    },
  })
  return mutation
}

export function useUpdateUserData() {
  return useUserDataMutation(API.updateUserData)
}
