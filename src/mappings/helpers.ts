// import { Address, Bytes } from "@graphprotocol/graph-ts";
// import { RubiconMarket as RubiconMarketSchema } from "../../generated/schema";
// import { RubiconMarket } from "../../generated/templates/RubiconMarket/RubiconMarket";
// import { LogSetOwner } from "../../generated/RubiconMarket/RubiconMarket";


export let zeroAddress = '0x0000000000000000000000000000000000000000'

// export function createRubiconMarket(
//   _rubiconMarketAddress: Address,
//   event: LogSetOwner
// ): RubiconMarketSchema {
//   let rubiconMarket: RubiconMarketSchema,
//     contract = RubiconMarket.bind(_rubiconMarketAddress)

//   let owner = contract.try_owner()

//   rubiconMarket = new RubiconMarketSchema(_rubiconMarketAddress.toHexString())

//   rubiconMarket.id = _rubiconMarketAddress.toHexString()

//   if (owner.reverted) {
//     rubiconMarket.owner = Address.fromString('0x0000000000000000000000000000000000000000')
//   } else {
//     rubiconMarket.owner = owner.value
//   }

//   return rubiconMarket as RubiconMarketSchema
// }

// export function createMarket(
//   _rubiconMarketAddress: Address,
//   event: Implementation
// ): RubiconMarketSchema {
//   let rubiconMarket: RubiconMarketSchema,
//     contract = RubiconMarket.bind(_rubiconMarketAddress)

//   let owner = contract.try_owner()

//   rubiconMarket = new RubiconMarketSchema(_rubiconMarketAddress.toHexString())

//   rubiconMarket.id = _rubiconMarketAddress.toHexString()

//   owner.reverted
//     ? rubiconMarket.owner = Address.fromString('0x0000000000000000000000000000000000000000')
//     : rubiconMarket.owner = owner.value

//   return rubiconMarket as RubiconMarketSchema
// }