const UNKNOWN_RELATIONAL = 0;
const ONE_TO_ONE = 1;
const ONE_TO_MANY = 2;
const MANY_TO_ONE = 3;
const MANY_TO_MANY = 4;

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
        order_details: [
            {
                order_number: '0123456',
                id: 1,
                name: 'Cocacola Can'
            },
            {
                order_number: '0123456',
                id: 2,
                name: 'Pepsi Can'
            }
        ]
    },
    {
        id: 3,
        order_details: []
    }
];

const countItemsRelationship = (received_order_details, itemSelected) => {
    const countRelationLinks = [];
    for (const received_order_detail of received_order_details) {
        const order_details = received_order_detail.order_details.filter((od) => od.id === itemSelected);
        if (order_details.length > 0) {
            countRelationLinks.push({
                id: received_order_detail.id,
                countItems: received_order_detail.order_details.length,
            });
        }
    }
    return countRelationLinks;
};
const relationalLinkItem = (receivedOrderNumber, orderNumberSelected, orderDetailId, countItemsRelation) => {
    if (countItemsRelation.length === 0) {
        return [ONE_TO_ONE, true];
    }
    if (countItemsRelation.length === 1) {
        if (receivedOrderNumber === orderNumberSelected) {
            return [ONE_TO_MANY, true];
        }
        if (receivedOrderNumber !== orderNumberSelected) {
            return [MANY_TO_MANY, true];
        }
    }
    if (receivedOrderNumber === orderNumberSelected) {
        return [MANY_TO_ONE, true];
    }
    if (receivedOrderNumber !== orderNumberSelected) {
        return [MANY_TO_MANY, false];
    }
    return [UNKNOWN_RELATIONAL, false];


    /*if (receivedOrderNumber === orderNumberSelected && countItems > 1) {
        return [ONE_TO_MANY, true];
    }
    if (receivedOrderNumber !== orderNumberSelected && countItems > 1) {
        return [ONE_TO_MANY, true];
    }*/
    /*if (receivedOrderNumber === orderNumberSelected && countItemsRelationship.length === 1) {
        return [ONE_TO_MANY, false];
    } else if (receivedOrderNumber === orderNumberSelected && countItemsRelationship.length > 1) {
        return [MANY_TO_ONE, true];
    } else if (receivedOrderNumber !== orderNumberSelected && countItemsRelationship.length <= 1) {
        return [ONE_TO_ONE, true];
    } else if (receivedOrderNumber !== orderNumberSelected && countItemsRelationship.length > 1) {
        return [MANY_TO_MANY, false];
    }*/
};

const result = countItemsRelationship(received_order_details, 1);
console.log(result);

const relational = relationalLinkItem('012345', '012345', 1, result);
console.log(relational);
