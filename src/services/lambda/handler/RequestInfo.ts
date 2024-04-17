export class RequestInfo<B> {
  private readonly _body: B;

  constructor(body: B) {
    this._body = body;
  }

  get body(): B {
    return this._body;
  }
}
