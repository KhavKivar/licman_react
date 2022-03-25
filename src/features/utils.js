export default function areEqual(x, y) {

    if (JSON.stringify(x) == JSON.stringify(y)) {
        return true;
    }
    return false;
}


export function difference(setA, setB) {
    let _difference = new Set(setA)
    for (let elem of setB) {
        _difference.delete(elem)
    }
    return _difference
}

