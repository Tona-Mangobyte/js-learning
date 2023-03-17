const UNKNOWN_RELATIONAL = 0;
const ONE_TO_ONE = 1;
const ONE_TO_MANY = 2;
const MANY_TO_ONE = 3;
const MANY_TO_MANY = 4;

const relationalLinkItem = (received_order_details, receivedOrderNumber, orderNumberSelected, orderDetailId) => {
    const receivedOrderDetails2 = received_order_details;
    for (const receivedOrderDetail of receivedOrderDetails2) {
        const countItemsLink = (receivedOrderDetail?.order_details ?? []).length;
        console.log(`relationalLinkItem@countItemsLink: ${countItemsLink} receivedOrderNumber: ${receivedOrderNumber} orderNumberSelected:${orderNumberSelected}`);
        for (const orderDetail of receivedOrderDetail?.order_details) {
            const one_to_many = receivedOrderNumber == orderNumberSelected && orderDetailId == orderDetail?.id;
            const many_to_one = receivedOrderNumber != orderNumberSelected && countItemsLink > 1;
            console.log(`one_to_many: ${one_to_many}`);
            console.log(`many_to_one: ${many_to_one}`);
            if (one_to_many) {
                return [MANY_TO_ONE, true];
            }
            /*if (receivedOrderNumber != orderNumberSelected && orderDetailId == orderDetail?.id) {
                return [MANY_TO_MANY, false];
            }*/
        }
        const one_to_one = receivedOrderNumber != orderNumberSelected && countItemsLink <= 1;
        const many_to_many = receivedOrderNumber != orderNumberSelected && countItemsLink > 1;
        console.log(`one_to_one: ${one_to_one}`);
        console.log(`many_to_many: ${many_to_many}`);
        if (one_to_one) {
            return [ONE_TO_ONE, true];
        } else if (receivedOrderNumber != orderNumberSelected && countItemsLink > 1) {
            return [MANY_TO_MANY, false];
        }
    }
    /*if (receivedOrderNumber == orderNumberSelected) {
        return [ONE_TO_MANY, true]; // One To Many
    }
    if (receivedOrderNumber != orderNumberSelected) {
        return [ONE_TO_ONE, true]; // One to One
    }*/
    return [UNKNOWN_RELATIONAL, false];
};

console.log(`Simple`);

const received_order_details = [
    {
        id: 1,
        order_details: [
            {
                order_number: '0123456',
                id: 1,
                name: 'Cocacola Can'
            }
        ]
    },
    {
        id: 2,
        order_details: []
    },
    {
        id: 3,
        order_details: []
    }
];

const [relationType, allow] = relationalLinkItem(received_order_details, '012345', '121212', 1);
console.log(`relationType: ${relationType} allow: ${allow}`);
