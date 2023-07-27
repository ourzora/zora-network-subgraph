import { InitiatedWithdraw } from "../generated/schema";
import { WithdrawalInitiated } from "../generated/Token/L2StandardBridge";
import { makeTransactionSpecificId } from "./utils";


export function handleWithdrawInitiated(event: WithdrawalInitiated): void {
    const id = makeTransactionSpecificId(event);

    const withdraw = new InitiatedWithdraw(id);

    /* from blockchain */
    withdraw.blockNumber = event.block.number;
    withdraw.blockTimestamp = event.block.timestamp;
    withdraw.eventTransactionHash = event.transaction.hash;
    withdraw.eventTransactionIndex = event.transaction.index;

    /* */
    withdraw.l1Token = event.params.l1Token;
    withdraw.l2Token = event.params.l2Token;
    withdraw.from = event.params.from;
    withdraw.to = event.params.to;
    withdraw.amount = event.params.amount;
    withdraw.extraData = event.params.extraData;

    withdraw.messagePassed = id;

    withdraw.save();
}