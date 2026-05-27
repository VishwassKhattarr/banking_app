import {
    getRecentTransferTransactionsModel
} from '../../models/fraudModel.js';



const buildGraph = (transactions) => {

    const graph = {};

    for (const transaction of transactions) {

        const sender =
            transaction.sender_id;

        const receiver =
            transaction.receiver_id;

        if (!graph[sender]) {
            graph[sender] = [];
        }

        graph[sender].push(receiver);
    }

    return graph;
};



const dfsCycleDetection = (
    node,
    graph,
    visited,
    recursionStack
) => {

    visited.add(node);

    recursionStack.add(node);

    const neighbors = graph[node] || [];

    for (const neighbor of neighbors) {

        if (!visited.has(neighbor)) {

            const hasCycle =
                dfsCycleDetection(
                    neighbor,
                    graph,
                    visited,
                    recursionStack
                );

            if (hasCycle) {
                return true;
            }
        }

        else if (
            recursionStack.has(neighbor)
        ) {
            return true;
        }
    }

    recursionStack.delete(node);

    return false;
};



export const detectTransactionCycles =
async () => {

    const transactions =
        await getRecentTransferTransactionsModel();

    const graph =
        buildGraph(transactions);

    const visited = new Set();

    const recursionStack = new Set();

    for (const node in graph) {

        if (!visited.has(Number(node))) {

            const hasCycle =
                dfsCycleDetection(
                    Number(node),
                    graph,
                    visited,
                    recursionStack
                );

            if (hasCycle) {

                return {
                    suspicious: true,
                    message:
                        "Transaction cycle detected"
                };
            }
        }
    }

    return {
        suspicious: false
    };
};