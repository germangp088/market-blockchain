import { ethers, utils } from 'ethers';
import config from '../config';
const Web3 = require("web3");

class EtherAccesor {
    private _wallet: ethers.Wallet;
    private _web3: any;

    constructor(privateKey?: string){
        this._web3 = new Web3(new Web3.providers.HttpProvider(config.ganache.host));
        if (privateKey) {
            this._wallet = new ethers.Wallet(privateKey);
        }
    }

    /**
     * newWallet
     */
    public async newWallet() {
        this.wallet = ethers.Wallet.createRandom();
        return this.wallet;
    }

    /**
     * getAddress
     */
    public async getAddress() {
        return await this.wallet.getAddress();
    }

    /**
     * getBalance
     */
    public async getBalance(address: string) {
        let provider = ethers.getDefaultProvider();
        return await provider.getBalance(address);
    }

    /**
     * transaction
     */
    public async transaction(from:string, to: string, value: string) {     
        const transaction = {
            from: from,
            to: to,

            value: utils.parseEther(value)
        }

        try {
            await this._web3.eth.sendTransaction(transaction);

            return true;
        } catch (error) {
            console.log({error});
            return false;
        }
    }

    /**
     * fund
     */
    public async fund() {
        const to: string = await this.getAddress();

        const accounts = await this._web3.eth.personal.getAccounts();

        // Transfer mock ethereums
        for (let index = 0; index < 10; index++) {
            const success = await this.transaction(accounts[index], to,  "50");
            if(success){
                break;
            }
        }
    }

    get wallet(){
        return this._wallet;
    }

    set wallet(value: ethers.Wallet) {
        this._wallet = value;
    }
}

export default EtherAccesor;