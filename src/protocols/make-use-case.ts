interface UseCase {
  (...args: any[]): Promise<any>
}

export interface MakeUseCase<TArgs extends object, TUseCase extends UseCase> {
  (args: TArgs): TUseCase
}
