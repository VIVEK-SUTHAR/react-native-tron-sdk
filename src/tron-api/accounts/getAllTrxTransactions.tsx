import { TronRpc } from '../../tron-rpc';

export type TransactionsRequest = {
  //The Address , of which you need to find the All transactions
  from: string;
  only_confirmed?: boolean;
  limit?: number;
  //fingerprint of the last transaction returned by the previous page; when using it, the other parameters and filters should remain the same
  fingerprint?: string;
  //contract address in base58 or hex
  only_to?: boolean;
  only_from?: boolean;
};
type CommonResponse = {
  ret: Array<{
    contractRet: string;
    fee: number;
  }>;
  signature: string[];
  txID: string;
  net_usage: number;
  raw_data_hex: string;
  net_fee: number;
  energy_usage: number;
  blockNumber: number;
  block_timestamp: number;
  energy_fee: number;
  energy_usage_total: number;
  raw_data: {
    contract: Array<{
      parameter: {
        value: {};
        type_url: string;
      };
      type: string;
    }>;
    ref_block_bytes: string;
    ref_block_hash: string;
    expiration: number;
    fee_limit: number;
    timestamp: number;
  };
  internal_transactions: any[];
};

type TransferContractResponse = CommonResponse & {
  raw_data: {
    contract: [
      {
        parameter: {
          value: {
            amount: number;
            owner_address: string;
            to_address: string;
          };
          type_url: 'type.googleapis.com/protocol.TransferContract';
        };
        type: 'TransferContract';
      },
    ];
  };
};

type TriggerSmartContractResponse = CommonResponse & {
  raw_data: {
    contract: [
      {
        parameter: {
          value: {
            data: string;
            owner_address: string;
            contract_address: string;
          };
          type_url: 'type.googleapis.com/protocol.TriggerSmartContract';
        };
        type: 'TriggerSmartContract';
      },
    ];
  };
};

export type TronTransaction =
  | TransferContractResponse
  | TriggerSmartContractResponse;
async function getAllTransactions(options: TransactionsRequest) {
  try {
    const queryParams = new URLSearchParams();

    for (const [key, value] of Object.entries(options)) {
      if (value !== undefined) {
        queryParams.append(key, value.toString());
      }
    }

    console.log('queryParams', queryParams.toString());

    const URL =
      TronRpc.currentRpcUrl +
      `/v1/accounts/${options.from}/transactions?${queryParams.toString()}`;

    let response = await fetch(URL, {
      method: 'GET',
      headers: TronRpc.commonHeaders,
    });
    const jsonResponse = await response.json();
    if (jsonResponse && jsonResponse.Error) {
      throw new Error(`Erron in Res: ${jsonResponse.Error}`);
    }

    return jsonResponse.data as TronTransaction[];
  } catch (error) {
    console.log('Error: ', error);

    throw new Error(`Error getting transactions`, { cause: error });
  }
}

export default getAllTransactions;
