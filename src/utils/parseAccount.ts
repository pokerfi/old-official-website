export function parseAccount(account: string) {
  if (account) {
    const account_1 = account.substring(0, 8)
    const account_2 = account.substring(account.length - 8, account.length)
    return account_1 + '....' + account_2
  }
}
