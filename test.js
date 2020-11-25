const zksync = require('zksync');
const ethers = require('ethers');
const fs = require('fs');

const MNEMONIC = fs.readFileSync(".secret").toString().trim();

let a = async ()=>{
    const syncProvider = await zksync.getDefaultProvider('localhost');
    const ethersProvider = new ethers.getDefaultProvider('http://47.241.13.124:8545');
    const ethWallet = new ethers.Wallet("27593fea79697e947890ecbecce7901b0008345e5d7259710d0dd5e500d040be",ethersProvider);
    console.log(`ethWallet.address:${ethWallet.address}`);
    const syncWallet = await zksync.Wallet.fromEthSigner(ethWallet, syncProvider);
    const ethOnChainBalance = await syncWallet.getEthereumBalance("ETH");
    console.log(`ethOnChainBalance:${ethOnChainBalance}`);
    console.log(`syncWallet.address:${await syncWallet.address()}`);
    var committedETHBalance = await syncWallet.getBalance('ETH');
    var verifiedETHBalance = await syncWallet.getBalance('ETH', 'verified');
    console.log(`committedETHBalance:${committedETHBalance}`);
    console.log(`verifiedETHBalance:${verifiedETHBalance}`);

    const deposit = await syncWallet.depositToSyncFromEthereum({
        depositTo: syncWallet.address(),
        token: 'ETH',
        amount: ethers.utils.parseEther('1.0')
      });
    // var receipt = await deposit.awaitReceipt();
    // console.log(`receipt:${JSON.stringify(receipt)}`);
    // var verifyReceipt = await deposit.awaitVerifyReceipt();
    // console.log(`verifyReceipt:${verifyReceipt}`);
    var committedETHBalance = await syncWallet.getBalance('ETH');
    var verifiedETHBalance = await syncWallet.getBalance('ETH', 'verified');
    console.log(`committedETHBalance:${committedETHBalance}`);
    console.log(`verifiedETHBalance:${verifiedETHBalance}`);
}

a();

setTimeout(() => {
    
}, 1000);