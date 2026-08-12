import { Server, Operation, TransactionBuilder, Networks, StrKey, Asset, Keypair } from 'stellar-sdk';

export type HorizonServer = Server;

export function getServer(horizonUrl = process.env.VITE_HORIZON_URL || 'https://horizon-testnet.stellar.org') {
  return new Server(horizonUrl);
}

export async function getAccountBalances(publicKey: string, server: HorizonServer = getServer()) {
  if (!StrKey.isValidEd25519PublicKey(publicKey)) {
    throw new Error('Invalid public key');
  }

  const account = await server.loadAccount(publicKey);
  const balances = account.balances.map(b => ({ asset_type: b.asset_type, asset_code: (b as any).asset_code, balance: b.balance }));
  return { accountId: account.id, balances };
}

export async function buildPaymentTransaction({
  sourcePublicKey,
  destination,
  amount,
  memo,
  server = getServer(),
}: {
  sourcePublicKey: string;
  destination: string;
  amount: string; // string amount, e.g., '5'
  memo?: string;
  server?: HorizonServer;
}) {
  if (!StrKey.isValidEd25519PublicKey(sourcePublicKey)) throw new Error('Invalid source public key');
  if (!StrKey.isValidEd25519PublicKey(destination)) throw new Error('Invalid destination public key');

  const account = await server.loadAccount(sourcePublicKey);
  const fee = await server.fetchBaseFee();

  const txb = new TransactionBuilder(account, {
    fee: String(fee),
    networkPassphrase: Networks.TESTNET,
  })
    .addOperation(Operation.payment({ destination, asset: Asset.native(), amount }))
    .setTimeout(60);

  if (memo) txb.addMemo(memo);

  const tx = txb.build();
  // Return base64 XDR for signing by wallet or Keypair
  return tx.toXDR();
}

export async function submitTransaction(signedTxXdr: string, server: HorizonServer = getServer()) {
  // signedTxXdr is base64 XDR of signed transaction
  const tx = TransactionBuilder.fromXDR(signedTxXdr, Networks.TESTNET);
  const response = await server.submitTransaction(tx);
  return response;
}
