export const switchToHederaNetwork = async (ethereum:any) => {
    try {
      await ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x128' }] // chainId must be in hexadecimal numbers
      });
    } catch (error: any) {
      if (error.code === 4902) {
        try {
          await ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainName: 'Hedera Testnet',
                chainId: '0x128',
                nativeCurrency: {
                  name: 'HBAR',
                  symbol: 'HBAR',
                  decimals: 18
                },
                rpcUrls: ['https://testnet.hashio.io/api']
              },
            ],
          });
        } catch (addError) {
          console.error(addError);
        }
      }
      console.error(error);
    }
  }


// returns a list of accounts
// otherwise empty array
export const connectToMetamask = async () => {
    const { ethereum } = window as any;
    // keep track of accounts returned
    let accounts: string[] = []
    if (!ethereum) {
      throw new Error("Metamask is not installed! Go install the extension!");
    }
    
    switchToHederaNetwork(ethereum);
    
    accounts = await ethereum.request({
      method: 'eth_requestAccounts',
    });
    return accounts;
  }