import { ethereum } from "@graphprotocol/graph-ts";

export function makeTransactionSpecificId(event: ethereum.Event): string {
    return `${event.transaction.hash.toHex()}-${event.transaction.index.toHex()}`;
}