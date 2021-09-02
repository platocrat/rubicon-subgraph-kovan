import { BigInt } from "@graphprotocol/graph-ts"
import {
  RubiconMarket,
  FeeTake,
  LogBump,
  LogBuyEnabled,
  LogDelete,
  LogInsert,
  LogInt,
  LogItemUpdate,
  LogKill,
  LogMake,
  LogMatch,
  LogMatchingEnabled,
  LogMinSell,
  LogNote,
  LogSetAuthority,
  LogSetOwner,
  LogSortedOffer,
  LogTake,
  LogTrade,
  LogUnsortedOffer,
  OfferDeleted
} from "../generated/RubiconMarket/RubiconMarket"
import { ExampleEntity } from "../generated/schema"

export function handleFeeTake(event: FeeTake): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = ExampleEntity.load(event.transaction.from.toHex())

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (entity == null) {
    entity = new ExampleEntity(event.transaction.from.toHex())

    // Entity fields can be set using simple assignments
    entity.count = BigInt.fromI32(0)
  }

  // BigInt and BigDecimal math are supported
  entity.count = entity.count + BigInt.fromI32(1)

  // Entity fields can be set based on event parameters
  entity.id = event.params.id
  entity.pair = event.params.pair

  // Entities can be written to the store with `.save()`
  entity.save()

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // - contract.AqueductAddress(...)
  // - contract.AqueductDistributionLive(...)
  // - contract._best(...)
  // - contract._dust(...)
  // - contract._head(...)
  // - contract._near(...)
  // - contract._rank(...)
  // - contract._span(...)
  // - contract.buy(...)
  // - contract.buyAllAmount(...)
  // - contract.buyEnabled(...)
  // - contract.cancel(...)
  // - contract.del_rank(...)
  // - contract.dustId(...)
  // - contract.getBestOffer(...)
  // - contract.getBetterOffer(...)
  // - contract.getBuyAmount(...)
  // - contract.getFirstUnsortedOffer(...)
  // - contract.getMinSell(...)
  // - contract.getNextUnsortedOffer(...)
  // - contract.getOffer(...)
  // - contract.getOfferCount(...)
  // - contract.getOwner(...)
  // - contract.getPayAmount(...)
  // - contract.getTime(...)
  // - contract.getWorseOffer(...)
  // - contract.initialized(...)
  // - contract.insert(...)
  // - contract.isActive(...)
  // - contract.isClosed(...)
  // - contract.isOfferSorted(...)
  // - contract.last_offer_id(...)
  // - contract.make(...)
  // - contract.matchingEnabled(...)
  // - contract.offer(...)
  // - contract.offer(...)
  // - contract.offer(...)
  // - contract.offers(...)
  // - contract.owner(...)
  // - contract.sellAllAmount(...)
  // - contract.setAqueductAddress(...)
  // - contract.setAqueductDistributionLive(...)
  // - contract.setBuyEnabled(...)
  // - contract.setFeeBPS(...)
  // - contract.setFeeTo(...)
  // - contract.setMatchingEnabled(...)
  // - contract.setMinSell(...)
  // - contract.stopped(...)
}

export function handleLogBump(event: LogBump): void {}

export function handleLogBuyEnabled(event: LogBuyEnabled): void {}

export function handleLogDelete(event: LogDelete): void {}

export function handleLogInsert(event: LogInsert): void {}

export function handleLogInt(event: LogInt): void {}

export function handleLogItemUpdate(event: LogItemUpdate): void {}

export function handleLogKill(event: LogKill): void {}

export function handleLogMake(event: LogMake): void {}

export function handleLogMatch(event: LogMatch): void {}

export function handleLogMatchingEnabled(event: LogMatchingEnabled): void {}

export function handleLogMinSell(event: LogMinSell): void {}

export function handleLogNote(event: LogNote): void {}

export function handleLogSetAuthority(event: LogSetAuthority): void {}

export function handleLogSetOwner(event: LogSetOwner): void {}

export function handleLogSortedOffer(event: LogSortedOffer): void {}

export function handleLogTake(event: LogTake): void {}

export function handleLogTrade(event: LogTrade): void {}

export function handleLogUnsortedOffer(event: LogUnsortedOffer): void {}

export function handleOfferDeleted(event: OfferDeleted): void {}
