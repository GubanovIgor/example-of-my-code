declare module '@sumsub/react-native-mobilesdk-module' {
  export type Status =
    | 'Ready'
    | 'Failed'
    | 'Initial'
    | 'Incomplete'
    | 'Pending'
    | 'TemporarilyDeclined'
    | 'FinallyRejected'
    | 'Approved'
    | 'ActionCompleted';

  export type Error =
    | 'Unknown'
    | 'InvalidParameters'
    | 'Unauthorized'
    | 'InitialLoadingFailed'
    | 'ApplicantNotFound'
    | 'ApplicantMisconfigured'
    | 'InititlizationError'
    | 'NetworkError'
    | 'UnexpectedError';

  export interface Result {
    success: boolean;
    status: SumSubStatusType;
    errorType: SumSubErrorType;
    errorMsg: string;
  }

  class SDKInstance {
    launch: () => Promise<Result>;
    dismiss: void;
  }

  type OnActionResult = (result: Result) => Promise<any>;

  type Build = () => SDKInstance;
  type WithLocale = (language: string) => { build: Build };
  type WithDebug = (isDebug: boolean) => { withLocale: WithLocale };
  type WithHandlers = ({
    onActionResult,
  }: {
    onActionResult: OnActionResult;
  }) => {
    withDebug: WithDebug;
  };

  export default class {
    static init(
      accessToken: string,
      callback: () => Promise<string>,
    ): { withHandlers: WithHandlers };
  }
}
