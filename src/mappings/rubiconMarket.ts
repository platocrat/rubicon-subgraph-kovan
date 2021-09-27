import { Address, BigInt } from "@graphprotocol/graph-ts"
import {
  RubiconMarket,
  // FeeTake,
  // LogBump,
  // LogBuyEnabled,
  // LogDelete,
  // LogInsert,
  // LogInt,
  // LogItemUpdate,
  LogKill,
  LogMake,
  // LogMatch,
  // LogMatchingEnabled,
  // LogMinSell,
  // LogNote,
  // LogSetAuthority,
  // LogSetOwner,
  // LogSortedOffer,
  LogTake,
  // LogTrade,
  // LogUnsortedOffer,
  // OfferDeleted
} from "../../generated/RubiconMarket/RubiconMarket"
import {
  LogKill as LogKillEntity,
  LogMake as LogMakeEntity,
  LogTake as LogTakeEntity,
  UserTrade
} from "../../generated/schema"
import { zeroAddress } from "./helpers"

export function handleLogKill(event: LogKill): void {
  let ep = event.params,
    lkID = ep.id.toHexString(),
    // Create new LogKill entity
    logKill = new LogKillEntity(lkID)

  // For `UserTrade` entity.
  let userTrade = UserTrade.load(lkID)

  logKill.id = lkID
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
    userTrade.id = lkID
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

  logMake.id = lmID
  logMake.pair = ep.pair
  logMake.maker = ep.maker
  logMake.pay_gem = ep.pay_gem
  logMake.buy_gem = ep.buy_gem
  logMake.pay_amt = ep.pay_amt
  logMake.buy_amt = ep.buy_amt
  logMake.timestamp = ep.timestamp
  logMake.transactionHash = ep._event.transaction.hash

  // Set to the `id` of the emitted LogMake event.
  userTrade.id = lmID
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

// export function handleLogMatch(event: LogMatch): void { }

// export function handleLogMatchingEnabled(event: LogMatchingEnabled): void { }

// export function handleLogMinSell(event: LogMinSell): void { }

// export function handleLogNote(event: LogNote): void { }

// export function handleLogSetAuthority(event: LogSetAuthority): void { }

// export function handleLogSetOwner(event: LogSetOwner): void { }

// export function handleLogSortedOffer(event: LogSortedOffer): void { }

export function handleLogTake(event: LogTake): void {
  let ep = event.params,
    ltID = ep.id.toHexString(),
    // Create new LogTake entity
    logTake = new LogTakeEntity(ltID)

  // For `UserTrade` entity.
  let userTrade = UserTrade.load(ltID)

  logTake.id = ltID
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
    userTrade.id = ltID
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

// export function handleLogTrade(event: LogTrade): void { }

// export function handleLogUnsortedOffer(event: LogUnsortedOffer): void { }

// export function handleOfferDeleted(event: OfferDeleted): void { }