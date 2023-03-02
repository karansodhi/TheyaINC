import "fast-text-encoding";
import "react-native-get-random-values";
if (typeof Buffer === "undefined") global.Buffer = require("buffer").Buffer;
import * as bip32 from "@scure/bip32";
import { hex } from "@scure/base";
import { deepStrictEqual } from "assert";
import BdkRn from "bdk-rn";
import * as bip39 from "bip39";
import * as btc from "micro-btc-signer";
// import { wordlist } from '@scure/bip39/wordlists/english';
// import Crypto from 'react-native-quick-crypto'
import * as Keychain from "react-native-keychain";
import { getSession, removeSession, storeSession } from "./Session";
import {
  GET_BALANCE,
  PRIMARY_XPUB,
  SESSION_USER_WALLET,
  SESSION_USER_WALLET_MAINNET,
  PRIMARY_XPUB_MAINNET,
} from "./StringUtility";

TEST_MNEMONIC_1 =
  "heavy cash tooth equip boring profit season infant news dust owner memory allow lunar mom anger elephant loop urge bronze net absurd dress brown";
TEST_MNEMONIC_2 =
  "exchange goddess hope sauce away vault light adjust nation powder lizard polar wrong chaos rain fish clock sudden salmon era stove cart excuse weird";
TEST_MNEMONIC_3 =
  "basket river unique sense frost later course program early human sphere summer theme flight pluck exit donor force song shell giraffe uphold bonus bulb";

//P device
TEST_MNEMONIC_4 =
  "garage fee cash hold zoo local crazy champion sibling recycle angry engine drastic fiber action citizen blur stumble decide mom once filter need consider";

//S device
TEST_MNEMONIC_5 =
  "observe pink phrase citizen useful bullet edge trip dinner shy dumb tumble dream ghost index arrive uphold exit foot retire shrimp inherit group parent";

privateKeys = [
  "cVTtquaDxcZoPUNi2JMFXMH8Y3aL4enD8ZmpZZJRsvhP371i4p4j",
  "cULLHQ3CtwM9ooF98Bi343BNyMJ2EzDKtZYmmfAEvWjHPoGGH2zG",
];

export const MAINNET_PREFIXES = {
  wif: 0x80,
  bip32: {
    public: 0x0488b21e,
    private: 0x0488ade4,
  },
  bech32: "bc",
  pubKeyHash: 0x00,
  scriptHash: 0x05,
};

export const TESTNET_PREFIXES = {
  wif: 0xef,
  bip32: {
    public: 0x043587cf,
    private: 0x04358394,
  },
  bech32: "tb",
  pubKeyHash: 0x6f,
  scriptHash: 0xc4,
};

export const getSingleSigAddress = async () => {
  ta = new Date() * 1;
  startTime = new Date() * 1;
  const mnemonic = bip39.generateMnemonic(256);
  tb = new Date() * 1;
  console.log("generateMnemonic: ", tb - ta);
  const seed = await bip39.mnemonicToSeed(mnemonic);
  ta = new Date() * 1;
  console.log("mnemonicToSeedSync: ", ta - tb);
  const privKey = bip32.HDKey.fromMasterSeed(seed);
  tb = new Date() * 1;
  console.log("fromMasterSeed: ", tb - ta);
  const addressStr = btc.getAddress("wpkh", privKey.privateKey);
  ta = new Date() * 1;
  console.log("getAddress: ", ta - tb);
  endTime = new Date() * 1;
  console.log(endTime - startTime);
  return addressStr;
  // setAddress(addressStr);
  // setDisplayText(addressStr);
};

export const getHDKey = async (mnemonic = nil, is_testnet = false) => {
  mnemonic = mnemonic || bip39.generateMnemonic(256);
  const seed = await bip39.mnemonicToSeed(mnemonic);
  let hdkey = bip32.HDKey;
  if (is_testnet) {
    // hdkey = hdkey.deriveChild(1);
    hdkey = hdkey.fromMasterSeed(seed, TESTNET_PREFIXES.bip32);
  } else {
    hdkey = hdkey.fromMasterSeed(seed, MAINNET_PREFIXES.bip32);
  }
  return hdkey;
};

export const getBip48DerivedKey = (
  privateExtendedKey,
  is_testnet = false,
  change = false
) => {
  // console.log("master key: ", privateExtendedKey);
  versions = is_testnet ? TESTNET_PREFIXES.bip32 : MAINNET_PREFIXES.bip32;
  hdkey = bip32.HDKey.fromExtendedKey(privateExtendedKey, versions).derive(
    "m/48'/0'/2'"
  );
  if (change) {
    hdkey = hdkey.deriveChild(1);
  } else {
    hdkey = hdkey.deriveChild(0);
  }

  // console.log("xpub: ", hdkey.publicExtendedKey);
  // console.log("xpriv: ", hdkey.privateExtendedKey);
  // console.log(
  //   "private key: ",
  //   btc.WIF(TESTNET_PREFIXES).encode(hdkey.privateKey)
  // );
  return hdkey;
};

export const getPubKeyBuffer = async (mnemonic, is_testnet = false) => {
  return Buffer.from(
    getBip48DerivedKey(
      await getHDKey(mnemonic, is_testnet).privateExtendedKey,
      is_testnet
    ).deriveChild(0).publicKey
  );
};

export const createMultiSigWallet = async () => {
  ta = new Date() * 1;
  const pub_1 = await getPubKeyBuffer(TEST_MNEMONIC_1);
  const pub_2 = await getPubKeyBuffer(TEST_MNEMONIC_2);
  const pub_3 = await getPubKeyBuffer(TEST_MNEMONIC_3);
  const ms = btc.sortedMultisig(2, [pub_1, pub_2, pub_3], true);
  tb = new Date() * 1;
  console.log("wallet ", ms.address, " address time: ", tb - ta);
  return ms.address;
  // setAddress(ms.address);
  // setDisplayText(ms.address);
};

export const setupMobileKey = async (is_testnet) => {
  mnemonic = bip39.generateMnemonic(256);
  let newHdKey = await getHDKey(mnemonic, is_testnet);
  let bip48DerivedKey = await getBip48DerivedKey(
    newHdKey.privateExtendedKey,
    is_testnet
  );
  let privateKeyForSigning = btc
    .WIF(is_testnet ? TESTNET_PREFIXES : MAINNET_PREFIXES)
    .encode(bip48DerivedKey.deriveChild(0).privateKey);

  // const seed = await bip39.mnemonicToSeed(mnemonic);
  // let hdkey = bip32.HDKey;
  // if (is_testnet) {
  //   hdkey = hdkey.fromMasterSeed(seed, TESTNET_PREFIXES.bip32);
  // } else {
  //   hdkey = hdkey.fromMasterSeed(seed, MAINNET_PREFIXES.bip32);
  // }
  // versions = is_testnet ? TESTNET_PREFIXES.bip32 : MAINNET_PREFIXES.bip32;
  // hdkey = hdkey.derive("m/48'/0'/2'");
  // privateKey = btc.WIF(TESTNET_PREFIXES).encode(hdkey.privateKey);
  // // console.log("derivation path: m/48'/0'/2'. Xpub: ", hdkey.publicExtendedKey);

  // Clear the credentials from key chain
  if (is_testnet) {
    await Keychain.resetGenericPassword();
  }

  //Need to store three value in keychain 1. mnemonic 2. privateKey 3.  hdkey.publicExtendedKey (publickey) and only  hdkey.publicExtendedKey (publickey) will be pass to beackend team
  //username == private key, password == all three keys 1. mnemonic 2. privateKey 3. public key
  const credentials = await Keychain.getGenericPassword();
  let tempKey;
  if (credentials) {
    tempKey = JSON.parse(credentials?.password);
  }
  console.log(tempKey, "credentials");
  let dic = is_testnet
    ? {
        mnemonic: mnemonic,
        privateKey: privateKeyForSigning,
        publicKey: bip48DerivedKey.publicExtendedKey,
      }
    : {
        mnemonic: tempKey.mnemonic,
        privateKey: tempKey.privateKey,
        publicKey: tempKey.publicKey,
        mainnetMnemonic: mnemonic,
        mainnetPrivateKey: privateKeyForSigning,
        mainnetPublicKey: bip48DerivedKey.publicExtendedKey,
      };

  // Store the credentials
  await Keychain.setGenericPassword("", JSON.stringify(dic)); //user name blank and password will set all three keys
  if (is_testnet) {
    storeSession(
      PRIMARY_XPUB,
      JSON.stringify(bip48DerivedKey.publicExtendedKey)
    );
  } else {
    storeSession(
      PRIMARY_XPUB_MAINNET,
      JSON.stringify(bip48DerivedKey.publicExtendedKey)
    );
  }
  console.log("TEST S PRIVATE KEY", privateKeyForSigning);
  return bip48DerivedKey.publicExtendedKey;
};

export const getValueFromKeyChain = async () => {
  try {
    // Retrieve the credentials
    const credentials = await Keychain.getGenericPassword();
    if (credentials) {
      // console.log("PRIVAT KEY===>", credentials.username); //username == private key
      // console.log("PUBLIC KEY===>", credentials.password); //password == public key
      return credentials;
    } else {
      console.log("No credentials stored");
    }
  } catch (error) {
    console.log("Keychain couldn't be accessed!", error);
  }
};

export const createBDKMultiSigWallet = async (
  is_testnet,
  f_xpub,
  s_xpub,
  r_xpub
) => {
  ta = new Date() * 1;
  hdkeys = [];
  if (is_testnet) {
    hdkeys = [
      await getHDKey(TEST_MNEMONIC_1, true),
      await getHDKey(TEST_MNEMONIC_2, true),
      await getHDKey(TEST_MNEMONIC_3, true),
    ];
  } else {
    hdkeys = [
      await getHDKey(TEST_MNEMONIC_1),
      await getHDKey(TEST_MNEMONIC_2),
      await getHDKey(TEST_MNEMONIC_3),
    ];
  }
  // this is needed for signing txns
  // setHDKeys(hdkeys);
  console.log("hdkeys ==>", hdkeys);

  // derivedKeys = [
  //   getBip48DerivedKey(hdkeys[0].privateExtendedKey, is_testnet),
  //   getBip48DerivedKey(hdkeys[1].privateExtendedKey, is_testnet),
  //   getBip48DerivedKey(hdkeys[2].privateExtendedKey, is_testnet),
  // ];
  // // setBip48Keys(derivedKeys);
  // console.log("derivedKeys ==>", derivedKeys);

  let saveWalletAddress;
  if (is_testnet) {
    // let p2ret = btc.p2wsh(
    //   btc.p2ms(
    //     2,
    //     btc._sortPubkeys([
    //       derivedKeys[0].deriveChild(0).publicKey,
    //       derivedKeys[1].deriveChild(0).publicKey,
    //       derivedKeys[2].deriveChild(0).publicKey,
    //     ])
    //   ),
    //   TESTNET_PREFIXES
    // );
    // console.log("is_testnet p2ret ==>", p2ret);

    let p2ret = btc.p2wsh(
      btc.p2ms(2, btc._sortPubkeys([f_xpub, s_xpub, r_xpub])),
      TESTNET_PREFIXES
    );
    //store user id and session tolen in session
    console.log("p2ret ==>", p2ret);
    saveWalletAddress = JSON.stringify(p2ret);
    // setP2Ret(p2ret);
  } else {
    // let p2ret = btc.p2wsh(
    //   btc.p2ms(
    //     2,
    //     btc._sortPubkeys([
    //       derivedKeys[0].deriveChild(0).publicKey,
    //       derivedKeys[1].deriveChild(0).publicKey,
    //       derivedKeys[2].deriveChild(0).publicKey,
    //     ])
    //   ),
    //   MAINNET_PREFIXES
    // );
    // console.log("p2ret ==>", p2ret);

    let p2ret = btc.p2wsh(
      btc.p2ms(2, btc._sortPubkeys([f_xpub, s_xpub, r_xpub])),
      MAINNET_PREFIXES
    );
    console.log("p2ret ==>", p2ret);
    saveWalletAddress = JSON.stringify(p2ret);

    // setP2Ret(p2ret);
  }

  descriptor = `wsh(sortedmulti(2,${f_xpub}/*,${s_xpub}/*,${r_xpub}/*))`;
  console.log("descriptor: ", descriptor);

  // descriptor = `wsh(sortedmulti(2,${derivedKeys[0].publicExtendedKey}/*,${derivedKeys[1].publicExtendedKey}/*,${derivedKeys[2].publicExtendedKey}/*))`;
  // console.log("descriptor: ", descriptor);
  wallet = await BdkRn.createWallet({
    descriptor: descriptor,
    network: is_testnet ? "testnet" : "bitcoin",
  });
  console.log(wallet);
  tb = new Date() * 1;
  console.log("wallet ", wallet.data.address, " address time: ", tb - ta);

  // setAddress(wallet.data.address);
  // setDisplayText(wallet.data.address);
  return true;
};

// export const sendTxn = async (
//   amount,
//   xpub0,
//   xpub1,
//   xpub2,
//   recipient,
//   primaryPrivatKey
// ) => {
//   // console.log("amount ======>", amount);
//   // console.log("recipient ======>", recipient);
//   console.log("primaryPrivatKey ======>", primaryPrivatKey);

//   pubkey0 = getCleanBip48Key(xpub0, true).deriveChild(0).publicKey;
//   pubkey1 = getCleanBip48Key(xpub1, true).deriveChild(0).publicKey;
//   pubkey2 = getCleanBip48Key(xpub2, true).deriveChild(0).publicKey;

//   let p2Ret = btc.p2wsh(
//     btc.p2ms(2, btc._sortPubkeys([pubkey0, pubkey1, pubkey2])),
//     TESTNET_PREFIXES
//   );
//   console.log("sendTxnsendTxn p2ret ======>", p2Ret);

//   // let myBalance = JSON.parse(await getSession(GET_BALANCE));
//   // console.log("getWalletAddressBalance myBalance ======>", myBalance);

//   // let wAddress = JSON.parse(await getSession(SESSION_USER_WALLET));
//   // // console.log("getWalletAddressBalance wAddress ======>", wAddress);

//   // const scriptArr = wAddress?.script.split(",");
//   // var passScriptArr = [];
//   // for (var i = 0; i < scriptArr.length; i++) {
//   //   passScriptArr.push(parseInt(scriptArr[i]));
//   // }
//   // console.log("getWalletAddressBalance passScriptArr ======>", passScriptArr);

//   // const witnessScriptArr = wAddress?.witnessScript.split(",");
//   // var passWitnessScriptArr = [];
//   // for (var i = 0; i < witnessScriptArr.length; i++) {
//   //   passWitnessScriptArr.push(parseInt(witnessScriptArr[i]));
//   // }
//   // console.log(
//   //   "getWalletAddressBalance passWitnessScriptArr ======>",
//   //   passWitnessScriptArr
//   // );

//   // p2Ret = {
//   //   address: wAddress.address,
//   //   script: Buffer.from(passScriptArr),
//   //   type: wAddress.type,
//   //   witnessScript: Buffer.from(passWitnessScriptArr),
//   // };

//   // console.log("getWalletAddressBalance p2Ret ======>", p2Ret);

//   // p2Ret = {
//   //   address: "tb1qtht59js4207g6las7aky42nmjm035vm4x4fn9pwfgselfafmmfzqqteyla",
//   //   script: Buffer.from([
//   //     0, 32, 93, 215, 66, 202, 21, 83, 252, 141, 127, 176, 247, 108, 74, 170,
//   //     123, 150, 223, 26, 51, 117, 53, 83, 50, 133, 201, 68, 51, 244, 245, 59,
//   //     218, 68,
//   //   ]),
//   //   type: "wsh",
//   //   witnessScript: Buffer.from([
//   //     82, 33, 2, 52, 226, 6, 196, 192, 148, 86, 208, 194, 47, 55, 53, 125, 40,
//   //     215, 114, 9, 208, 140, 169, 77, 121, 26, 130, 208, 107, 7, 133, 215, 190,
//   //     28, 21, 33, 2, 243, 185, 144, 54, 36, 129, 76, 193, 250, 187, 13, 65, 126,
//   //     142, 158, 231, 219, 92, 15, 80, 29, 255, 245, 153, 121, 99, 193, 103, 221,
//   //     51, 114, 235, 33, 3, 159, 24, 158, 199, 68, 229, 117, 27, 180, 122, 78,
//   //     25, 198, 17, 57, 123, 82, 227, 142, 186, 107, 52, 8, 41, 106, 120, 82,
//   //     222, 37, 39, 171, 172, 83, 174,
//   //   ]),
//   // };
//   // console.log("getWalletAddressBalance p2Ret ======>", p2Ret);

//   sendAddress = p2Ret.address; //NEEED TO REPLACE WTITH REC ADDRESS
//   sendAmount = amount;
//   console.log("Checking error 00");

//   const tx = new btc.Transaction();
//   tx.addOutputAddress(sendAddress, sendAmount, {
//     wif: TESTNET_PREFIXES.wif,
//     bech32: TESTNET_PREFIXES.bech32,
//   });
//   console.log("Checking error 0000000");

//   tx.addInput({
//     txid: "c0b23761cdcf7b0f111d272c2325b77acb248d516e8f38fbe6b891588ded1651",
//     index: 1,
//     witnessUtxo: {
//       script: p2Ret.script,
//       amount: 1000n,
//     },
//     redeemScript: p2Ret.redeemScript,
//     witnessScript: p2Ret.witnessScript,
//     sighashType: btc.SignatureHash.ALL,
//   });

//   // tx.addInput({
//   //   txid: "f2922087f6585239e657e0db4a47b2d23985acaf7eed0d902d3bae28cd68cf7c",
//   //   index: 0,
//   //   witnessUtxo: {
//   //     script: Buffer.from(
//   //       "00205dd742ca1553fc8d7fb0f76c4aaa7b96df1a337535533285c94433f4f53bda44",
//   //       "hex"
//   //     ),
//   //     amount: 6000n,
//   //   },
//   //   redeemScript: p2Ret.redeemScript,
//   //   witnessScript: p2Ret.witnessScript,
//   //   sighashType: btc.SignatureHash.ALL,
//   // });

//   console.log("Checking error 11");

//   const psbt = tx.toPSBT();
//   const tx2 = btc.Transaction.fromPSBT(psbt);
//   console.log("sign with first key");

//   tx2.sign(
//     btc
//       .WIF({
//         wif: TESTNET_PREFIXES.wif,
//       })
//       .decode(primaryPrivatKey)
//   );
//   console.log("sign with second key");
//   tx2.sign(
//     btc
//       .WIF({
//         wif: TESTNET_PREFIXES.wif,
//       })
//       .decode("cQc6GS7KMf1F3nJhdPzfBFiwVEyEz9gDjtxoxNnYZeRoEPzsLYXP")
//   );
//   console.log("Checking error 435");

//   const psbt2 = tx2.toPSBT();
//   console.log("Checking error 22");

//   const tx4 = btc.Transaction.fromPSBT(psbt2);
//   tx4.finalize();
//   const psbt5 = tx4.toPSBT();
//   console.log("psbt4 complete!");
//   const tx5 = btc.Transaction.fromPSBT(psbt5);
//   rawTxnUint8Array = tx5.extract();
//   rawTxn = hex.encode(rawTxnUint8Array);
//   // console.log(rawTxn);
//   deepStrictEqual(
//     rawTxnUint8Array,
//     hex.decode(
//       "020000000001017ccf68cd28ae3b2d900ded7eafac8539d2b2474adbe057e6395258f6872092f20000000000ffffffff0188130000000000002200205dd742ca1553fc8d7fb0f76c4aaa7b96df1a337535533285c94433f4f53bda440400483045022100d12c9050398d6fd7aba80a8eeac831d843c086f400c2841dbd7df87e2199c44b022008ab4076cdabc070b7fb5a9279efb4864962e3e006bf365721303da94867252901483045022100ca275e5c759d4f708177fab2dae7caed168bbaf46c634af18f6a12e75f61413f022057be6318d2b2df5781f7be9016ad4506faa5bc0f64710e27df671b15620eb23e016952210234e206c4c09456d0c22f37357d28d77209d08ca94d791a82d06b0785d7be1c152102f3b9903624814cc1fabb0d417e8e9ee7db5c0f501dfff5997963c167dd3372eb21039f189ec744e5751bb47a4e19c611397b52e38eba6b3408296a7852de2527abac53ae00000000"
//     )
//   );
//   console.log("sendTxt returnValue", rawTxn);
//   return rawTxn;
// };

//NEW WALLER FCREATE

export const sendTxn = async (
  amount,
  xpub0,
  xpub1,
  xpub2,
  recipient,
  primaryPrivatKey,
  utxos,
  isTestnet
) => {
  console.log("amount ======>", amount);
  console.log("recipient ======>", recipient);

  console.log({ xpub0, xpub1, xpub2 });
  console.log("primaryPrivatKey ======>", primaryPrivatKey);

  pubkey0 = getCleanBip48Key(xpub0, isTestnet).deriveChild(0).publicKey;
  pubkey1 = getCleanBip48Key(xpub1, isTestnet).deriveChild(0).publicKey;
  pubkey2 = getCleanBip48Key(xpub2, isTestnet).deriveChild(0).publicKey;

  console.log("r1");
  // let p2Ret = btc.p2wsh(
  //   btc.p2ms(2, btc._sortPubkeys([pubkey0, pubkey1, pubkey2])),
  //   TESTNET_PREFIXES
  // );

  //let p2Ret = (await getP2retAndAddress(true, xpub0, xpub1, xpub2)).p2ret
  let p2Ret = btc.p2wsh(
    btc.p2ms(2, btc._sortPubkeys([pubkey0, pubkey1, pubkey2])),
    isTestnet ? TESTNET_PREFIXES : MAINNET_PREFIXES
  );

  console.log("sendTxnsendTxn p2ret ======>", p2Ret);

  sendAddress = recipient;
  sendAmount = Math.trunc(Number(amount) * 100000000);
  console.log("Checking error 00");

  const tx = new btc.Transaction();

  console.log({ sendAddress, sendAmount, TESTNET_PREFIXES });
  tx.addOutputAddress(sendAddress, sendAmount, {
    wif: isTestnet ? TESTNET_PREFIXES.wif : MAINNET_PREFIXES.wif,
    bech32: isTestnet ? TESTNET_PREFIXES.bech32 : MAINNET_PREFIXES.bech32,
  });
  //
  // tx.addOutputAddress(multisigWalletAddress, total_transaction-(send_amount+fee), {
  //   wif: TESTNET_PREFIXES.wif,
  //   bech32: TESTNET_PREFIXES.bech32,
  // });
  console.log("Checking error 0000000");

  console.log({ primaryPrivatKey });
  console.log("script: ", hex.encode(p2Ret.script));
  for (const utxo of utxos) {
    const utxoPayload = {
      txid: utxo.transactionId,
      index: utxo.index,
      witnessUtxo: {
        script: p2Ret.script,
        amount: Math.trunc(Number(utxo.amount) * 100003200),
      },
      redeemScript: p2Ret.redeemScript,
      witnessScript: p2Ret.witnessScript,
      sighashType: btc.SignatureHash.ALL,
    };
    console.log({ utxoPayload });
    tx.addInput(utxoPayload);
  }

  const psbt = tx.toPSBT();
  let tx2 = btc.Transaction.fromPSBT(psbt);

  // privateKeys = [
  //   btc.WIF({wif: TESTNET_PREFIXES.wif}).encode(BIP48Keys[0].deriveChild(0).privateKey),
  //   btc.WIF({wif: TESTNET_PREFIXES.wif}).encode(BIP48Keys[1].deriveChild(0).privateKey)
  // ];
  // console.log("privateKeys: ", privateKeys);
  console.log("sign with first key");
  tx2.sign(
    btc
      .WIF({
        wif: isTestnet ? TESTNET_PREFIXES.wif : MAINNET_PREFIXES.wif,
      })
      .decode(primaryPrivatKey)
  );

  // pass this to server
  const partialySignedTx = hex.encode(tx2.toPSBT());
  console.log({ partialySignedTx }, "partialySignedTx");
  // secondarySigning(partialySignedTx);

  return { partialySignedTx };
};

export const secondarySigning = async (partialySignedTx, isTestnet) => {
  console.log(partialySignedTx, "second partialySignedTx");
  const tx = btc.Transaction.fromPSBT(hex.decode(partialySignedTx));

  //May be this required for pass private key.
  let credentials = await getValueFromKeyChain();
  let currentKey = {};
  if (credentials) {
    currentKey = JSON.parse(credentials?.password);
    // console.log("credentials===>", credentials); //username == private key, password == all three keys
    console.log("ALL KEY===>", JSON.parse(credentials?.password)); //password == all keys 1. mnemonic 2. privateKey 3. publickey
  }

  console.log("sign with second key");
  tx.sign(
    btc
      .WIF({
        wif: isTestnet ? TESTNET_PREFIXES.wif : MAINNET_PREFIXES.wif,
      })
      .decode(isTestnet ? currentKey.privateKey : currentKey.mainnetPrivateKey) //we need to pass here secondary device private key.
  );
  console.log("conv to psbt ");
  const psbt = tx.toPSBT();

  console.log("Checking error 22", psbt);

  const tx2 = btc.Transaction.fromPSBT(psbt);
  console.log("tx2", tx2);

  tx2.finalize();

  const psbt2 = tx2.toPSBT();
  console.log("psbt4 complete!");

  const tx3 = btc.Transaction.fromPSBT(psbt2);
  rawTxnUint8Array = tx3.extract();
  rawTxn = hex.encode(rawTxnUint8Array);
  // console.log(rawTxn);
  // deepStrictEqual(
  //   rawTxnUint8Array,
  //   hex.decode(
  //     "02000000000101288b612e7771e051080806cf553c30ffbed204f87a1ef8df83df91e497fb7cfc0100000000ffffffff0164000000000000002200204dc95faeb3134c95f9adeccd8295d365ad0dc02f1f96cfa5c96105f28605bc020400483045022100c0345b09f54a51447dd0a376530604b0647607c43c60916bfbf4c75f4f78b534022036b241f617e45ba3a9938bd79f871bb35af107d24ce49607db8b6acf4240032601483045022100c2710dc6e3b723290720e5de02ff0d1fd02a0505bc5fbe280fbc9e1bb3fc363302201c390480cdbebf1e4279f8ca6f3ea7967ee2ac9587cbf37eee3d7e116716c1ec0169522102894d058ef3fd4c1eb24905d2449bfa46d86587778303b5b697f50d3d03399c3221032ce15ed76fff6a88f3d7c0f12951aa2052618089965093dc5eb92405f111ffa8210356921dee100317a1587903b3a529b5cadb957cfdb796be01b506b363684af10c53ae00000000"
  //   )
  // );
  console.log("sendTxt returnValue", rawTxn);
  // pass this to server to broadcast.
  return rawTxn;
};

export const getCleanBip48Key = (publicExtendedKey, is_testnet = false) => {
  // console.log("master key: ", privateExtendedKey)
  versions = is_testnet ? TESTNET_PREFIXES.bip32 : MAINNET_PREFIXES.bip32;
  hdkey = bip32.HDKey.fromExtendedKey(publicExtendedKey, versions);
  return hdkey;
};

// export const cleanMultiSigWallet = async (is_testnet, xpub0, xpub1, xpub2) => {
//   console.log("cleanMultiSigWallet xpub0==>", xpub0);
//   console.log("cleanMultiSigWallet xpub1==> ", xpub1);
//   console.log("cleanMultiSigWallet xpub2 ==>", xpub2);

//   pubkey0 = getCleanBip48Key(xpub0, is_testnet).deriveChild(0).publicKey;
//   pubkey1 = getCleanBip48Key(xpub1, is_testnet).deriveChild(0).publicKey;
//   pubkey2 = getCleanBip48Key(xpub2, is_testnet).deriveChild(0).publicKey;

//   console.log("cleanMultiSigWallet pubkey0==>", pubkey0);
//   console.log("cleanMultiSigWallet pubkey1==> ", pubkey1);
//   console.log("cleanMultiSigWallet pubkey2 ==>", pubkey2);

//   if (is_testnet) {
//     console.log("cleanMultiSigWallet ==> is_testnet", is_testnet);

//     let p2ret = btc.p2wsh(
//       btc.p2ms(2, btc._sortPubkeys([pubkey0, pubkey1, pubkey2])),
//       TESTNET_PREFIXES
//     );

//     console.log("cleanMultiSigWallet ==> p2ret", p2ret);

//     let address = p2ret?.address.toString();
//     let script = p2ret?.script.toString();
//     let type = p2ret?.type.toString();
//     let witnessScript = p2ret?.witnessScript.toString();

//     let Dict = {
//       address: address,
//       script: script,
//       type: type,
//       witnessScript: witnessScript,
//     };
//     console.log("P2RET ==>", JSON.stringify(Dict));
//     storeSession(SESSION_USER_WALLET, JSON.stringify(Dict));

//     // setP2Ret(p2ret);
//   } else {
//     let p2ret = btc.p2wsh(
//       btc.p2ms(2, btc._sortPubkeys([pubkey0, pubkey1, pubkey2])),
//       MAINNET_PREFIXES
//     );
//     // console.log("P2RET ==>", p2ret);
//     // setP2Ret(p2ret);

//     let address = p2ret?.address.toString();
//     let script = p2ret?.script.toString();
//     let type = p2ret?.type.toString();
//     let witnessScript = p2ret?.witnessScript.toString();
//     let Dict = {
//       address: address,
//       script: script,
//       type: type,
//       witnessScript: witnessScript,
//     };
//     storeSession(SESSION_USER_WALLET, JSON.stringify(Dict));
//   }

//   descriptor = `wsh(sortedmulti(2,${xpub0}/*,${xpub1}/*,${xpub2}/*))`;
//   wallet = await BdkRn.createWallet({
//     descriptor: descriptor,
//     network: is_testnet ? "testnet" : "bitcoin",
//   });
//   // console.log("wallet ==>", wallet);
//   console.log("cleanMultiSigWallet ==> wallet", wallet);

//   return true;
// };

export const cleanMultiSigWallet = async (is_testnet, xpub0, xpub1, xpub2) => {
  await getP2retAndAddress(is_testnet, xpub0, xpub1, xpub2);
  return true;
};

export const getP2retAndAddress = async (is_testnet, xpub0, xpub1, xpub2) => {
  console.log("cleanMultiSigWallet xpub0==>", xpub0);
  console.log("cleanMultiSigWallet xpub1==> ", xpub1);
  console.log("cleanMultiSigWallet xpub2 ==>", xpub2);

  pubkey0 = getCleanBip48Key(xpub0, is_testnet).deriveChild(0).publicKey;
  pubkey1 = getCleanBip48Key(xpub1, is_testnet).deriveChild(0).publicKey;
  pubkey2 = getCleanBip48Key(xpub2, is_testnet).deriveChild(0).publicKey;

  console.log("cleanMultiSigWallet pubkey0==>", pubkey0);
  console.log("cleanMultiSigWallet pubkey1==> ", pubkey1);
  console.log("cleanMultiSigWallet pubkey2 ==>", pubkey2);

  let p2ret, Dict;
  if (is_testnet) {
    console.log("cleanMultiSigWallet ==> is_testnet", is_testnet);

    p2ret = btc.p2wsh(
      btc.p2ms(2, btc._sortPubkeys([pubkey0, pubkey1, pubkey2])),
      TESTNET_PREFIXES
    );

    console.log("cleanMultiSigWallet ==> p2ret", p2ret);

    let address = p2ret?.address;
    let script = p2ret?.script;
    let type = p2ret?.type;
    let witnessScript = p2ret?.witnessScript;

    Dict = {
      address: address,
      script: script,
      type: type,
      witnessScript: witnessScript,
    };
    console.log("P2RET ==>", JSON.stringify(Dict));
    storeSession(SESSION_USER_WALLET, JSON.stringify(Dict));

    // setP2Ret(p2ret);
  } else {
    p2ret = btc.p2wsh(
      btc.p2ms(2, btc._sortPubkeys([pubkey0, pubkey1, pubkey2])),
      MAINNET_PREFIXES
    );
    // console.log("P2RET ==>", p2ret);
    // setP2Ret(p2ret);

    let address = p2ret?.address.toString();
    let script = p2ret?.script.toString();
    let type = p2ret?.type.toString();
    let witnessScript = p2ret?.witnessScript.toString();
    Dict = {
      address: address,
      script: script,
      type: type,
      witnessScript: witnessScript,
    };
    storeSession(SESSION_USER_WALLET_MAINNET, JSON.stringify(Dict));
  }

  descriptor = `wsh(sortedmulti(2,${xpub0}/*,${xpub1}/*,${xpub2}/*))`;
  wallet = await BdkRn.createWallet({
    descriptor: descriptor,
    network: is_testnet ? "testnet" : "bitcoin",
  });
  // console.log("wallet ==>", wallet);
  console.log("cleanMultiSigWallet ==> wallet", wallet);

  return { wallet, p2ret: Dict };
};
