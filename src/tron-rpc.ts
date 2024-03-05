export class TronRpc {
  static defaultRpcUrl: string = 'https://api.trongrid.io';
  static currentRpcUrl: string = TronRpc.defaultRpcUrl;

  static setRpcUrl(rpcUrl: string): void {
    TronRpc.currentRpcUrl = rpcUrl;
  }
}
