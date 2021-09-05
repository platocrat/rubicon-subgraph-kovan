import { Address, BigInt } from "@graphprotocol/graph-ts"
import { BathToken } from "../../generated/templates"
import { LogInit, Deposit } from "../../generated/templates/BathToken/BathToken"
import { Deposit as DepositSchema, LogInit as LogInitSchema } from "../../generated/schema"

export function handleLogInit(event: LogInit): void {
  let ep = event.params,
    // Set ID for this event as the BathToken address
    bathTokenAddress = ep._event.address

  BathToken.create(bathTokenAddress)

  let logInit = new LogInitSchema(bathTokenAddress.toHexString())

  logInit.id = bathTokenAddress.toHexString()
  logInit.timeOfInit = ep.timeOfInit

  logInit.save()
}

export function handleDeposit(event: Deposit): void {
  let ep = event.params,
    // Set ID for this event as the BathToken address
    depositID = ep._event.address.toHexString()

  let deposit = new DepositSchema(depositID)

  deposit.id = depositID
  deposit.depositedAmt = ep.depositedAmt
  deposit.asset = ep.asset
  deposit.sharesReceived = ep.sharesReceived
  deposit.depositor = ep.depositor

  deposit.save()
}

