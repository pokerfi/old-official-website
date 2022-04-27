import {
  CardSlotStore_address,
  CardStore_ABI,
  CardStore_address,
  PokerToken_ABI,
  PokerToken_ADDRESS,
  Reward_ABI,
  Reward_address,
  SlotStore_ABI,
  PokerFiGovernor_address,
  PokerFiGovernor_ABI,
  PokerFiSharesFactory_address,
  PokerFiSharesFactory_ABI,
  PokerFiShares_address,
  PokerFiShares_ABI,
  PokerFiShares_address_PKS,
  PokerFiTimelockController_address,
  PokerFiTimelockController_ABI,
  ABI_INJECTION,
  poker_address,
  ABI_EXCHANGE,
  pokerFiReedem_address,
  PancakeToken_ABI,
  PancakeToken_Address,
  BurnPool_ABI,
  BurnPool_Address,
  Pks_Address,
} from './constant'
import web3 from './initWeb3'

export const ContractPokerToken = new web3.eth.Contract(PokerToken_ABI, PokerToken_ADDRESS)
export const ContractCardStore = new web3.eth.Contract(CardStore_ABI, CardStore_address)
export const ContractSlotStore = new web3.eth.Contract(SlotStore_ABI, CardSlotStore_address)
export const ContractReward = new web3.eth.Contract(Reward_ABI, Reward_address)
export const IN_Contract = new web3.eth.Contract(ABI_INJECTION, poker_address)
export const EX_Contract = new web3.eth.Contract(ABI_EXCHANGE, pokerFiReedem_address)

export const ContractPokerFiGovernor = new web3.eth.Contract(PokerFiGovernor_ABI, PokerFiGovernor_address)
export const ContractPokerFiSharesFactory = new web3.eth.Contract(
  PokerFiSharesFactory_ABI,
  PokerFiSharesFactory_address,
)
export const ContractPokerFiShares = new web3.eth.Contract(PokerFiShares_ABI, PokerFiShares_address)

export const ContractPokerFiSharesPKS = new web3.eth.Contract(PokerFiShares_ABI, PokerFiShares_address_PKS)

export const ContractPokerFiTimelockController = new web3.eth.Contract(
  PokerFiTimelockController_ABI,
  PokerFiTimelockController_address,
)

export const ContractPancakeToken = new web3.eth.Contract(PancakeToken_ABI, PancakeToken_Address)

export const ContractPKS = new web3.eth.Contract(PancakeToken_ABI, Pks_Address)

export const ContractBurnPool = new web3.eth.Contract(BurnPool_ABI, BurnPool_Address)
