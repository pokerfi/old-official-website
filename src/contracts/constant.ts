import PokerToken from './abis/PokerToken.json'
import CardStore from './abis/CardStore.json'
import SlotStore from './abis/SlotStore.json'
import Reward from './abis/Reward.json'
import PokerFiGovernor from './abis/PokerFiGovernor.json'
import PokerFiShares from './abis/PokerFiShares.json'
import PokerFiSharesFactory from './abis/PokerFiSharesFactory.json'
import PokerFiTimelockController from './abis/PokerFiTimelockController.json'
import exchange from './abis/exchange.json'
import injection from './abis/injection.json'
import BurnPool from './abis/BurnPool.json'
import PancakeToken from './abis/PancakeToken.json'

// export const CHAIN_ID = 97 //链ID
// export const RPC_URL = 'https://data-seed-prebsc-1-s1.binance.org:8545' //链地址

export const CHAIN_ID = 56 //链ID
export const RPC_URL = 'https://bsc-dataseed1.binance.org' //链地址

export const STATIC_URL = 'https://pokerfi.network/'

/**
 * api_test http://47.108.172.3:10096/
 * api_test1 http://47.108.172.3:10092/
 * api_test2 http://47.108.77.85:8545/
 * api_formal https://game.toolkit.bar/
 * http://192.168.31.83:8545
 * http://172.18.1.127:8545
 * http://172.18.0.217:8545
 */

export const IP_URL = 'https://game.toolkit.bar/'
// export const IP_URL = 'http://47.108.77.85:8545/'

export const PokerToken_ADDRESS = '0x89Aba1453f58aB08056DA973163A67EFed95A432'
export const CardSlotStore_address = '0x6200266D5e9fd8226D496036c475BB350a3232c4'
export const CardStore_address = '0x49B29b0b00dC4B2D72549E7D99F9f61fE3853C9b'
export const MiningPool_address = '0x9c93e6100183235999A3085Af48C8b2945A4e9A2'

export const Reward_address = '0x89Aba1453f58aB08056DA973163A67EFed95A432'

export const PokerFiGovernor_address = '0x4634c668373b2b915c624B208445E1CBfafF72Dc'
export const PokerFiShares_address = '0x89Aba1453f58aB08056DA973163A67EFed95A432' //token
export const PokerFiShares_address_PKS = '0xCB0Db183CE55aB319763229c9f132c61Ac8eab20'
export const PokerFiSharesFactory_address = '0xDC9f24aEDb044810E9dcdde97d17C15b685A47eF'
export const PokerFiTimelockController_address = '0xd08C31E921880CD955ab9eBb62cdf1A402CFB76f'

export const PokerToken_ABI: any = PokerToken
export const CardStore_ABI: any = CardStore
export const SlotStore_ABI: any = SlotStore
export const Reward_ABI: any = Reward
export const PokerFiGovernor_ABI: any = PokerFiGovernor
export const PokerFiShares_ABI: any = PokerFiShares
export const PokerFiSharesFactory_ABI: any = PokerFiSharesFactory
export const PokerFiTimelockController_ABI: any = PokerFiTimelockController

//合约地址
export const poker_address = '0x3DDECfa3E7D4Ff87DD6533095F47F01E71Cc14fe'
export const pokerFiReedem_address = '0xB32b39490c161b0d71D4562DBFC6EAacf4EE6fD8'
//合约接口
export const ABI_EXCHANGE: any = exchange
export const ABI_INJECTION: any = injection

// 燃烧池
export const PancakeToken_Address = '0xb45b5a257D3Cfc3477f46EAFD7CBa2EE0A186dc2'
export const BurnPool_Address = '0x09256A244cbE8B2D1d078486632b55e7C7cBe8e7'
export const Pks_Address = '0xCB0Db183CE55aB319763229c9f132c61Ac8eab20'

export const BurnPool_ABI: any = BurnPool
export const PancakeToken_ABI: any = PancakeToken
