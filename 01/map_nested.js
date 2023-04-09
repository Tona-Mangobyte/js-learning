
const order_details_relations = [
    {
        received_order_detail: {
            item_number: 1,
            order_details: [
                { order: { order_number: '12345679' } },
                { order: { order_number: '12345679' } }
            ],
        },
    },
    {
        received_order_detail: {
            item_number: 2,
            order_details: [
                { order: { order_number: '12345681' } },
                { order: { order_number: '12345681' } }
            ],
        },
    }
];

const order_details_relations2 = [
    {
        received_order_detail: {
            item_number: 1,
            order_details: [],
        },
    },
    {
        received_order_detail: {
            item_number: 2,
            order_details: [
                { order: { order_number: '12345681' } },
                { order: { order_number: '12345681' } }
            ],
        },
    },
    {
        received_order_detail: {
            item_number: 3,
            order_details: [],
        },
    },
];

let result1 = '';
if (order_details_relations2?.length) {
    result1 = order_details_relations2?.map((data) => {
        const received_order_detail = data?.received_order_detail ?? null;
        if (data?.received_order_detail?.order_details?.length) {
            return data?.received_order_detail?.order_details?.map((item) => {
                const item_number = received_order_detail !== null ? received_order_detail?.item_number?.toString()?.length === 1 ? `0${received_order_detail?.item_number}` : received_order_detail?.item_number : '';
                const order = item?.order ?? null;
                const orderNumberAndItemNumber = order?.order_number ? `${order?.order_number}${item_number}` : '';
                return order !== null ? `${orderNumberAndItemNumber} ${order?.order_name ?? ''}` : '';
            }).join(', ');
        }
    })?.filter((item) => item).join(', ');
}

console.log(result1);
// console.log(order_details_relations);