const UNKNOWN_RELATIONAL = 0;
const ONE_TO_ONE = 1;
const ONE_TO_MANY = 2;
const MANY_TO_ONE = 3;
const MANY_TO_MANY = 4;

const oneToOne = [
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
                id: 2,
                name: 'Tiger Can'
            },
            {
                order_number: '0123456',
                id: 3,
                name: 'Pepsi Can'
            }
        ]
    },
    {
        id: 3,
        order_details: []
    }
];
const oneToMany = [
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
                id: 2,
                name: 'Tiger Can'
            },
            {
                order_number: '0123456',
                id: 3,
                name: 'Pepsi Can'
            }
        ]
    },
    {
        id: 3,
        order_details: [
            {
                order_number: '0123456',
                id: 2,
                name: 'Tiger Can'
            },
        ]
    }
];

const manyToOne = [
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
        ]
    },
    {
        id: 3,
        order_details: [
            {
                order_number: '0123456',
                id: 1,
                name: 'Cocacola Can'
            },
        ]
    }
];

const findItemsRelations = (received_order_details, orderDetailId) => {
    const itemRelationLinks = [];
    for (const received_order_detail of received_order_details) {
        const order_details = received_order_detail.order_details?.filter((od) => od.id == orderDetailId);
        if (order_details.length) {
            itemRelationLinks.push({
                id: received_order_detail.id,
                countItems: received_order_detail.order_details.length,
            });
        }
    }
    return itemRelationLinks;
};

const countItemRelationSelected = (received_order_details, orderDetailId) => {
    let count = 0;
    for (const received_order_detail of received_order_details) {
        const order_details = received_order_detail.order_details.filter((od) => od.id == orderDetailId);
        if (order_details.length) {
            count++;
        }
    }
    return count;
}

const relationalLinkItem = (received_order_details, receivedOrderNumber, orderNumberSelected, orderDetailId, selectedReceivedOrderDetailIndex) => {
    console.log(`orderDetailId: ${orderDetailId}`);
    const countItemSelected = countItemRelationSelected(received_order_details, orderDetailId);
    const itemRelationLinks = findItemsRelations(received_order_details, orderDetailId);
    const countItemsLink = (received_order_details[selectedReceivedOrderDetailIndex]?.order_details ?? []).length;
    console.log(`countSelectedRelation: ${countItemSelected} countItemsLink:${countItemsLink}`);
    console.log(itemRelationLinks);
    if (countItemSelected === 1 && countItemsLink === 1) {
        return [ONE_TO_ONE, true];
    }
    if (receivedOrderNumber == orderNumberSelected) {
        if (countItemSelected === 1 && countItemsLink > 1) {
            return [ONE_TO_MANY, true];
        }
        if (countItemSelected > 1 && countItemsLink === 1) {
            return [MANY_TO_ONE, true];
        }
    }
    if (countItemSelected > 1 && countItemsLink > 1) {
        return [MANY_TO_MANY, false];
    }
    return [UNKNOWN_RELATIONAL, false];
};


// const relational_oneToOne = relationalLinkItem(oneToOne, '012345', '012345', 1, 0);
// const relational_oneToMany = relationalLinkItem(oneToMany, '012345', '012345', 2, 1);
const relational_manyToOne = relationalLinkItem(manyToOne, '012345', '012345', 1, 0);
console.log(relational_manyToOne);
