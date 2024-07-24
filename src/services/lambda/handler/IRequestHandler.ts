import { Context } from 'aws-lambda';

export interface IRequestHandler<I, O> {
  requestHandler(event: I, context: Context): Promise<O>;
}
