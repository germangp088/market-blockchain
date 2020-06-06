import { ethers } from 'ethers';

class EtherAccesor {
    private _wallet: ethers.Wallet;

    constructor(privateKey?: string){
        if (privateKey) {
            this._wallet = new ethers.Wallet(privateKey);
        }
    }

    /**
     * newWallet
     */
    public newWallet(): ethers.Wallet {
        this.wallet = ethers.Wallet.createRandom();
        return this.wallet;
    }

    get wallet(){
        return this._wallet;
    }

    set wallet(value: ethers.Wallet) {
        this._wallet = value;
    }
}

export default EtherAccesor;