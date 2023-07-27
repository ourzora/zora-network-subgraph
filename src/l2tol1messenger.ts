import {MessagePassed} from '../generated/L2ToL1Messenger/L2ToL1Messenger'
import {PassedMessage} from '../generated/schema'
import { makeTransactionSpecificId } from './utils';

export function handleMessagePassed(event: MessagePassed): void {
    const id = makeTransactionSpecificId(event);
    const passedMessage = new PassedMessage(id);

    /* from blockchain */
    passedMessage.blockNumber = event.block.number;
    passedMessage.blockTimestamp = event.block.timestamp;
    passedMessage.eventTransactionHash = event.transaction.hash;
    passedMessage.eventTransactionIndex = event.transaction.index;

    /* from parameters */
    passedMessage.nonce = event.params.nonce;
    passedMessage.sender = event.params.sender;
    passedMessage.target = event.params.target;
    passedMessage.value = event.params.value;
    passedMessage.gasLimit = event.params.gasLimit;
    passedMessage.data = event.params.data;
    passedMessage.withdrawalHash = event.params.withdrawalHash;

    passedMessage.withdrawalRequest = id;

    passedMessage.save();
}