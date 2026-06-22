interface ApiErrorLike {
  response?: {
    data?: {
      detail?: unknown
    }
  }
}

export const getApiErrorMessage = (error: unknown, fallback: string) => {
  const detail = (error as ApiErrorLike).response?.data?.detail
  return typeof detail === 'string' ? detail : fallback
}
