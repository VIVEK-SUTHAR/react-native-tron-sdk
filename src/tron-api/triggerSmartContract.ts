export type SendSmartContractOptions = {
  owner_address: string;
  contract_address: string;
  function_selector: string;
  parameter: string;
  fee_limit: number;
  call_value: number;
  visible: boolean;
};
export default async function triggerSmartContract(
  options: SendSmartContractOptions
) {
  try {
    let headersList = {
      'Accept': '*/*',
      'Content-Type': 'application/json',
    };
    let bodyContent = JSON.stringify(options);
    let response = await fetch(
      'https://nile.trongrid.io/wallet/triggersmartcontract',
      {
        method: 'POST',
        body: bodyContent,
        headers: headersList,
      }
    );
    const jsonResponse = await response.json();
    if (jsonResponse && jsonResponse.Error) {
      throw new Error(`Error creating transaction: ${jsonResponse.Error}`);
    }

    // If the response does not contain an error, return the data
    return jsonResponse;
  } catch (error) {}
}
