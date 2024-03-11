export class TronRpc {
  static defaultRpcUrl: string = 'https://nile.trongrid.io';
  static currentRpcUrl: string = TronRpc.defaultRpcUrl;
  static commonHeaders: Record<string, string> = {
    'Accept': '*/*',
    'Content-Type': 'application/json',
    'TRON-PRO-API-KEY': 'd8184913-2573-4d56-82c3-5f67d102bb03',
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
