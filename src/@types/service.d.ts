interface MakeService<TArgs extends object, TService> {
  (args: TArgs): TService
}
