import { Address, BigInt } from "@graphprotocol/graph-ts"
import { /* BathToken, */ Deposit } from "../../generated/templates/BathToken/BathToken"
import { Deposit as DepositEntity } from "../../generated/schema"

export function handleDeposit(event: Deposit): void {
  let ep = event.params,
    // Set ID for this event as the BathToken address
    depositID = ep._event.address.toHexString()

  let deposit = new DepositEntity(depositID)

  deposit.id = depositID
  deposit.depositedAmt = ep.depositedAmt
  deposit.asset = ep.asset
  deposit.sharesReceived = ep.sharesReceived
  deposit.depositor = ep.depositor

  deposit.save()
}