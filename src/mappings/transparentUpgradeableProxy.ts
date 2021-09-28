import { Address, BigInt } from "@graphprotocol/graph-ts"
import {
  TransparentUpgradeableProxy,
  AdminChanged,
  Implementation,
  Upgraded
} from "../../generated/TransparentUpgradeableProxy/TransparentUpgradeableProxy"
import {
  AdminChanged as AdminChangedEntity,
  Implementation as ImplementationEntity,
  Upgraded as UpgradedEntity,
} from "../../generated/schema"
import { createMarket, zeroAddress } from "./helpers"
import { RubiconMarket } from "../../generated/templates"
import { createRubiconMarket } from './helpers'

export function handleAdminChanged(event: AdminChanged): void {
  let ep = event.params,
    // Set the ID of this entity to the address of this event.
    adminChangedID = ep._event.address.toHexString(),
    // Create new AdminChanged entity
    adminChanged = new AdminChangedEntity(adminChangedID)

  adminChanged.id = adminChangedID
  adminChanged.previousAdmin = ep.previousAdmin
  adminChanged.newAdmin = ep.newAdmin

  adminChanged.save()
}

export function handleImplementation(event: Implementation): void {
  // For `Implementation` entity.
  let ep = event.params,
    implementationID = ep._event.address.toHexString(),
    // Create new Implementation entity.
    implementation = new ImplementationEntity(implementationID)

  implementation.id = implementationID
  implementation.currentImplementation = ep.currentImplementation

  implementation.save()

  let contractAddress = ep.currentImplementation

  // Instantiate RubiconMarket implementation.
  RubiconMarket.create(contractAddress)

  let rubiconMarket = createMarket(contractAddress, event)
  rubiconMarket.save()
}

export function handleUpgraded(event: Upgraded): void {
  let ep = event.params,
    upgradedID = ep._event.address.toHexString(),
    // Create new Upgraded entity
    upgraded = new UpgradedEntity(upgradedID)

  upgraded.id = upgradedID
  upgraded.implementation = ep.implementation

  upgraded.save()
}