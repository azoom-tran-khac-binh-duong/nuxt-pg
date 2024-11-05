export const appError = (status: number, statusMessage: string) => {
  return createError({
    status,
    statusMessage,
  })
}