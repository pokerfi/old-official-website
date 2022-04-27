import Web3 from 'web3'
import { RPC_URL } from './constant'

const web3 = new Web3(Web3.givenProvider || RPC_URL)

export default web3
