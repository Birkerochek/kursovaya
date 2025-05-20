import { AxiosError } from 'axios'

export function createErrorHandler(resource = 'данных') {
  return function getErrorMessage(err: unknown): string {
    if (err && typeof err === 'object' && 'message' in err) {
      const axiosErr = err as AxiosError<{ message?: string }>

      if (axiosErr.response?.data?.message) {
        return axiosErr.response.data.message
      }

     
      switch (axiosErr.response?.status) {
        case 404:
          return `Список ${resource} не найден`
        case 500:
          return `Внутренняя ошибка сервера при получении ${resource}`
        case 200:
            console.log('Данные получены')
      }

      if (axiosErr.code === 'ERR_NETWORK') {
        return 'Проверьте подключение к интернету'
      }

      return `Ошибка при получении ${resource}`
    }

    return 'Непредвиденная ошибка'
  }
}
