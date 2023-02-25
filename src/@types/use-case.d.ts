interface UseCase {
  (...args: any[]): Promise<any>
}

interface MakeUseCase<TArgs extends object, TUseCase extends UseCase> {
  (args: TArgs): TUseCase
}
