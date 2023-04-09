
const json2 = {
    '90':'address',
    '56':'age',
    '10':'client_name',
    '01':'customer_id',
    '03':'first_visit_date',
    '02':'prefecture',
}

// console.log(keyOrder(json2, ['90','02','03','01','56']));
keyOrder(json2, ['90','02','03','01','56']).map((data) => {
    console.log(data);
})
function keyOrder(data, key_order = []) {
    if (!key_order.length) {
        return '';
    }
    return key_order.map((key) => [key, data[key]]);
}
