export class TronRpc {
  static defaultRpcUrl: string = 'https://nile.trongrid.io';
  static currentRpcUrl: string = TronRpc.defaultRpcUrl;
  static commonHeaders: Record<string, string> = {
    'Accept': '*/*',
    'Content-Type': 'application/json',
  };

  static setRpcUrl(
    rpcUrl: string,
    customHeaders?: Record<string, string>
  ): void {
    TronRpc.currentRpcUrl = rpcUrl;
    if (customHeaders) {
      TronRpc.commonHeaders = {
        ...TronRpc.commonHeaders,
        ...customHeaders,
      };
    }
  }
}
