
//===============================================================================
// utility

export function mapObject(obj, callback) {
    var result = {};
    Object.keys(obj).forEach(function (key) {
        result[key] = callback.call(obj, obj[key], key, obj);
    });
    return result;
}

//===============================================================================

export function defaultDict (choices,value) {
    let result = {}
    choices.forEach( (choice) => {
        result[choice['name']] = value
    })
    return result
}

//===============================================================================

