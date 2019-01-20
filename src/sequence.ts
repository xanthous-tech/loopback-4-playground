import {inject} from '@loopback/context';
import {AccessBindings, AccessAction} from 'loopback-4-accesscontrol';

import {
  FindRoute,
  InvokeMethod,
  ParseParams,
  Reject,
  RequestContext,
  RestBindings,
  Send,
  SequenceHandler,
  RouteEntry,
  OperationArgs,
  OperationRetval,
  HttpErrors,
  StaticAssetsRoute,
} from '@loopback/rest';

const SequenceActions = RestBindings.SequenceActions;

export class RestSequence implements SequenceHandler {
  constructor(
    @inject(SequenceActions.FIND_ROUTE) protected findRoute: FindRoute,
    @inject(SequenceActions.PARSE_PARAMS) protected parseParams: ParseParams,
    @inject(SequenceActions.INVOKE_METHOD) protected invoke: InvokeMethod,
    @inject(SequenceActions.SEND) public send: Send,
    @inject(SequenceActions.REJECT) public reject: Reject,
    @inject(AccessBindings.ACCESS) protected accessAction: AccessAction,
  ) {}

  async handle(context: RequestContext) {
    try {
      const {request, response} = context;
      const route = this.findRoute(request);
      const args = await this.parseParams(request, route);

      /**
       * There is not accesscontrol check on static routes.
       */
      if (!(route instanceof StaticAssetsRoute)) {
        await this.accessAction(request);
      }

      const result = await this.invokeWithErrorHandler(route, args);

      this.send(response, result);
    } catch (err) {
      this.reject(context, err);
    }
  }

  /**
   * Catch application errors and map them to HttpError here.
   * This is useful for frontend to make sense of the error.
   */
  async invokeWithErrorHandler(
    route: RouteEntry,
    args: OperationArgs,
  ): Promise<OperationRetval> {
    try {
      return await this.invoke(route, args);
    } catch (error) {
      if (error.name === 'EntityNotFound') {
        error = new HttpErrors.NotFound(error.message);
      }

      if (error.code === 'SQLITE_CONSTRAINT') {
        error = new HttpErrors.Conflict(error.message);
      }

      throw error;
    }
  }
}
