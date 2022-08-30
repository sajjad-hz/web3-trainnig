export function getSigner(library, account) {
    return library.getSigner(account).connectUnchecked();
  }
  
  // account is optional
  export function getProviderOrSigner(library, account) {
    return account ? getSigner(library, account) : library;
  }
  