import { Address, BigInt, log } from "@graphprotocol/graph-ts"
import {
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
} from "../../generated/RubiconMarket/RubiconMarket"
import { RubiconMarket } from '../../generated/templates'
import {
  FeeTake as FeeTakeEntity,
  LogBump as LogBumpEntity,
  LogBuyEnabled as LogBuyEnabledEntity,
  LogDelete as LogDeleteEntity,
  LogInsert as LogInsertEntity,
  LogInt as LogIntEntity,
  LogItemUpdate as LogItemUpdateEntity,
  LogKill as LogKillEntity,
  LogMake as LogMakeEntity,
  LogMatch as LogMatchEntity,
  LogMatchingEnabled as LogMatchingEnabledEntity,
  LogMinSell as LogMinSellEntity,
  LogNote as LogNoteEntity,
  LogSetAuthority as LogSetAuthorityEntity,
  LogSetOwner as LogSetOwnerEntity,
  LogSortedOffer as LogSortedOfferEntity,
  LogTake as LogTakeEntity,
  LogTrade as LogTradeEntity,
  LogUnsortedOffer as LogUnsortedOfferEntity,
  OfferDeleted as OfferDeletedEntity,
  UserTrade
} from "../../generated/schema"
import { createRubiconMarket, zeroAddress } from "./helpers"


export function handleFeeTake(event: FeeTake): void {
  let ep = event.params,
    feeTakeID = ep.id.toHexString(),
    feeTake = new FeeTakeEntity(feeTakeID)

  feeTake.id = feeTakeID + '-' + ep._event.transaction.hash.toHexString()
  feeTake.pair = ep.pair
  feeTake.asset = ep.asset
  feeTake.taker = ep.taker
  feeTake.feeTo = ep.feeTo
  feeTake.feeAmt = ep.feeAmt
  feeTake.timestamp = ep.timestamp

  feeTake.save()
}

export function handleLogBump(event: LogBump): void {
  let ep = event.params,
    logBumpID = ep.id.toHexString(),
    logBump = new LogBumpEntity(logBumpID)

  logBump.id = logBumpID + '-' + ep._event.transaction.hash.toHexString()
  logBump.pair = ep.pair
  logBump.maker = ep.maker
  logBump.pay_gem = ep.pay_gem
  logBump.buy_gem = ep.buy_gem
  logBump.pay_amt = ep.pay_amt
  logBump.timestamp = ep.timestamp

  logBump.save()
}

export function handleLogBuyEnabled(event: LogBuyEnabled): void {
  let ep = event.params,
    logBuyEnabledID = ep._event.address.toHexString(),
    logBuyEnabled = new LogBuyEnabledEntity(logBuyEnabledID)

  logBuyEnabled.id = logBuyEnabledID + '-' + ep._event.transaction.hash.toHexString()
  logBuyEnabled.isEnabled = true

  logBuyEnabled.save()
}

export function handleLogDelete(event: LogDelete): void {
  let ep = event.params,
    logDeleteID = ep._event.address.toHexString(),
    logDelete = new LogDeleteEntity(logDeleteID)

  logDelete.id = logDeleteID + '-' + ep._event.transaction.hash.toHexString()
  logDelete.keeper = ep.keeper
  // same as logDelete.id
  logDelete.logDeleteID = logDeleteID + '-' + ep._event.transaction.hash.toHexString()

  logDelete.save()
}

export function handleLogInsert(event: LogInsert): void {
  let ep = event.params,
    logInsertID = ep._event.address.toHexString(),
    logInsert = new LogInsertEntity(logInsertID)

  logInsert.id = logInsertID + '-' + ep._event.transaction.hash.toHexString()
  logInsert.keeper = ep.keeper
  // same as logInsert.id
  logInsert.logInsertID = logInsertID + '-' + ep._event.transaction.hash.toHexString()

  logInsert.save()
}

export function handleLogInt(event: LogInt): void {
  let ep = event.params,
    logIntID = ep._event.address.toHexString(),
    logInt = new LogIntEntity(logIntID)

  logInt.id = logIntID + '-' + ep._event.transaction.hash.toHexString()
  logInt.lol = ep.lol
  logInt.input = ep.input

  logInt.save()
}

export function handleItemUpdate(event: LogItemUpdate): void {
  let ep = event.params,
    logItemUpdateID = ep._event.address.toHexString(),
    logItemUpdate = new LogItemUpdateEntity(logItemUpdateID)

  logItemUpdate.id = logItemUpdateID + '-' + ep._event.transaction.hash.toHexString()
  // same as logItemUpdate.id
  logItemUpdate.logItemUpdateID = logItemUpdateID + '-' + ep._event.transaction.hash.toHexString()

  logItemUpdate.save()
}

export function handleLogKill(event: LogKill): void {
  let ep = event.params,
    lkID = ep.id.toHexString(),
    // Create new LogKill entity
    logKill = new LogKillEntity(lkID)

  // For `UserTrade` entity.
  let userTrade = UserTrade.load(lkID)

  logKill.id = lkID + '-' + ep._event.transaction.hash.toHexString()
  logKill.pair = ep.pair
  logKill.maker = ep.maker
  logKill.pay_gem = ep.pay_gem
  logKill.buy_gem = ep.buy_gem
  logKill.pay_amt = ep.pay_amt
  logKill.buy_amt = ep.buy_amt
  logKill.timestamp = ep.timestamp
  logKill.transactionHash = ep._event.transaction.hash

  if (userTrade != null) {
    // If the trade is killed, we update the `id` of the UserTrade entity
    // to the `id` of the emitted LogKill event.
    userTrade.id = lkID + '-' + ep._event.transaction.hash.toHexString()
    userTrade.isLimit = false
    userTrade.maker = ep.maker
    userTrade.taker = userTrade.taker
    userTrade.payGem = ep.pay_gem
    userTrade.buyGem = ep.buy_gem
    // In the LogTake update, it is `userTrade.payAmount.minus(ep.take_amt)`
    userTrade.payAmount = ep.pay_amt
    // In the LogTake update, it is `userTrade.buyAmount.minus(ep.give_amt)`
    userTrade.buyAmount = ep.buy_amt

    userTrade.payAmount == BigInt.fromI32(0)
      ? userTrade.completed == true
      : userTrade.completed == false

    userTrade.killed = true
    // Update to the timestamp of this emitted LogKill event.
    userTrade.timestamp = ep.timestamp
    // Update to the transaction hash of this emitted LogKill event.
    userTrade.transactionHash = ep._event.transaction.hash
  }

  logKill.save()
  userTrade.save()
}

export function handleLogMake(event: LogMake): void {
  // For `LogMake` entity.
  let ep = event.params,
    lmID = ep.id.toHexString(),
    // Create new LogMake entity.
    logMake = new LogMakeEntity(lmID)

  // For `UserTrade` entity.
  let userTrade = new UserTrade(lmID)

  logMake.id = lmID + '-' + ep._event.transaction.hash.toHexString()
  logMake.pair = ep.pair
  logMake.maker = ep.maker
  logMake.pay_gem = ep.pay_gem
  logMake.buy_gem = ep.buy_gem
  logMake.pay_amt = ep.pay_amt
  logMake.buy_amt = ep.buy_amt
  logMake.timestamp = ep.timestamp
  logMake.transactionHash = ep._event.transaction.hash

  // Set to the `id` of the emitted LogMake event.
  userTrade.id = lmID + '-' + ep._event.transaction.hash.toHexString()
  userTrade.isLimit = true
  userTrade.maker = ep.maker
  userTrade.taker = Address.fromString(zeroAddress)
  userTrade.payGem = ep.pay_gem
  userTrade.buyGem = ep.buy_gem
  userTrade.payAmount = ep.pay_amt
  userTrade.buyAmount = ep.buy_amt
  userTrade.completed = false
  userTrade.killed = false
  userTrade.timestamp = ep.timestamp
  userTrade.transactionHash = ep._event.transaction.hash

  logMake.save()
  userTrade.save()
}

export function handleLogMatch(event: LogMatch): void {
  let ep = event.params,
    logMatchID = ep._event.address.toHexString(),
    logMatch = new LogMatchEntity(logMatchID)

  logMatch.id = logMatchID + '-' + ep._event.transaction.hash.toHexString()
  // same as logMatch.id
  logMatch.logMatchID = logMatchID + '-' + ep._event.transaction.hash.toHexString()
  logMatch.amount = ep.amount

  logMatch.save()
}

export function handleMatchingEnabled(event: LogMatchingEnabled): void {
  let ep = event.params,
    logMatchingEnabledID = ep._event.address.toHexString(),
    logMatchingEnabled = new LogMatchingEnabledEntity(logMatchingEnabledID)

  logMatchingEnabled.id = logMatchingEnabledID + '-' + ep._event.transaction.hash.toHexString()
  logMatchingEnabled.isEnabled = ep.isEnabled

  logMatchingEnabled.save()
}

export function handleLogMinSell(event: LogMinSell): void {
  let ep = event.params,
    logMinSellID = ep._event.address.toHexString(),
    logMinSell = new LogMinSellEntity(logMinSellID)

  logMinSell.id = logMinSellID + '-' + ep._event.transaction.hash.toHexString()
  logMinSell.pay_gem = ep.pay_gem
  logMinSell.min_amount = ep.min_amount

  logMinSell.save()
}

export function handleLogNote(event: LogNote): void {
  let ep = event.params,
    logNoteID = ep._event.address.toHexString(),
    logNote = new LogNoteEntity(logNoteID)

  logNote.id = logNoteID + '-' + ep._event.transaction.hash.toHexString()
  logNote.sig = ep.sig
  logNote.guy = ep.guy
  logNote.foo = ep.foo
  logNote.bar = ep.bar
  logNote.wad = ep.wad
  logNote.fax = ep.fax

  logNote.save()
}

export function handleLogSetAuthority(event: LogSetAuthority): void {
  let ep = event.params,
    logSetAuthorityID = ep._event.address.toHexString(),
    logSetAuthority = new LogSetAuthorityEntity(logSetAuthorityID)

  logSetAuthority.id = logSetAuthorityID + '-' + ep._event.transaction.hash.toHexString()
  logSetAuthority.authority = ep.authority

  logSetAuthority.save()
}


export function handleLogSetOwner(event: LogSetOwner): void {
  let rubiconMarketAddy = event.params._event.address
  RubiconMarket.create(rubiconMarketAddy)
  let rubiconMarket = createRubiconMarket(rubiconMarketAddy, event)
  rubiconMarket.save()

  log.warning(`RubiconMarket address:  \n`, [rubiconMarketAddy.toHexString()])

  // For `LogSetOwner` entity.
  let logSetOwnerID = event.params._event.address.toHexString(),
    // Create new LogSetOwner entity.
    logSetOwner = new LogSetOwnerEntity(logSetOwnerID)

  logSetOwner.id = logSetOwnerID + '-' + event.params._event.transaction.hash.toHexString()
  // logSetOwner.id = null
  logSetOwner.owner = event.params.owner

  log.warning(`RubiconMarket owner: \n`, [event.params.owner.toHexString()])

  logSetOwner.save()
}

export function handleLogSortedOffer(event: LogSortedOffer): void {
  let ep = event.params,
    lsoID = ep.id.toHexString(),
    // Create new LogTake entity
    logSortedOffer = new LogSortedOfferEntity(lsoID)

  logSortedOffer.id = lsoID + '-' + ep._event.transaction.hash.toHexString()
  // same as logSortedOffer.id
  logSortedOffer.logSortedOfferID = lsoID + '-' + ep._event.transaction.hash.toHexString()
}

export function handleLogTake(event: LogTake): void {
  let ep = event.params,
    ltID = ep.id.toHexString(),
    // Create new LogTake entity
    logTake = new LogTakeEntity(ltID)

  // For `UserTrade` entity.
  let userTrade = UserTrade.load(ltID)

  logTake.id = ltID + '-' + ep._event.transaction.hash.toHexString()
  logTake.pair = ep.pair
  logTake.maker = ep.maker
  logTake.taker = ep.taker
  logTake.pay_gem = ep.pay_gem
  logTake.buy_gem = ep.buy_gem
  logTake.take_amt = ep.take_amt
  logTake.give_amt = ep.give_amt
  logTake.timestamp = ep.timestamp
  logTake.transactionHash = ep._event.transaction.hash

  if (userTrade != null) {
    // Update to the `id` of the emitted LogTake event.
    userTrade.id = ltID + '-' + ep._event.transaction.hash.toHexString()
    userTrade.isLimit = false
    userTrade.maker = ep.maker
    userTrade.taker = ep.taker
    userTrade.payGem = ep.pay_gem
    userTrade.buyGem = ep.buy_gem
    userTrade.payAmount = ep.give_amt
    userTrade.buyAmount = ep.take_amt

    userTrade.payAmount == BigInt.fromI32(0)
      ? userTrade.completed == true
      : userTrade.completed == false

    userTrade.killed = false
    // Update to the timestamp of this emitted LogMake event.
    userTrade.timestamp = ep.timestamp
    // Update to the transaction hash of this emitted LogMake event.
    userTrade.transactionHash = ep._event.transaction.hash
  }

  logTake.save()
  userTrade.save()
}

export function handleTradeell(event: LogTrade): void {
  let ep = event.params,
    logTradeID = ep._event.address.toHexString(),
    logTrade = new LogTradeEntity(logTradeID)

  logTrade.id = logTradeID + '-' + ep._event.transaction.hash.toHexString()
  logTrade.pay_gem = ep.pay_gem
  logTrade.pay_gem = ep.pay_gem
  logTrade.buy_amt = ep.buy_amt
  logTrade.buy_gem = ep.buy_gem

  logTrade.save()
}

export function handleLogUnsortedOffer(event: LogUnsortedOffer): void {
  let ep = event.params,
    logUnsortedOfferID = ep._event.address.toHexString(),
    logUnsortedOffer = new LogUnsortedOfferEntity(logUnsortedOfferID)

  logUnsortedOffer.id = logUnsortedOfferID + '-' + ep._event.transaction.hash.toHexString()
  // same as logUnsortedOffer.id
  logUnsortedOffer.logUnsortedOfferID = logUnsortedOfferID + '-' + ep._event.transaction.hash.toHexString()

  logUnsortedOffer.save()
}

export function handleOfferDeleted(event: OfferDeleted): void {
  let ep = event.params,
    offerDeletedID = ep._event.address.toHexString(),
    offerDeleted = new OfferDeletedEntity(offerDeletedID)

  offerDeleted.id = offerDeletedID + '-' + ep._event.transaction.hash.toHexString()
  offerDeleted.offerDeletedID = offerDeleted.id
}
