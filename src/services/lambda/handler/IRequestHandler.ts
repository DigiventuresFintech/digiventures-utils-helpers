export interface IRequestHandler<I, O> {
  requestHandler(event: I): Promise<O>;
}
