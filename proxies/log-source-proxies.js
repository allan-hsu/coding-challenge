// custom proxy handler so we can compare dates as if we are comparing generic heap values
export const logSourceMinHeapProxyHandler = {
    get(target, key) {
        // if calling from proxy we use custom behaviour otherwise use normal behaviour
        if(typeof(target[key]) === 'number' || typeof(target[key]) === 'function') return Reflect.get(...arguments);
        if(target?.[key]?.last) return target?.[key]?.last.date;
        return false;
    }
};

export const logEntryMinHeapProxyHandler = {
    get(target, key) {
        if(!key in target) return false;
        // if calling from proxy we use custom behaviour otherwise use normal behaviour
        if(typeof(target[key]) === 'number' || typeof(target[key]) === 'function') return Reflect.get(...arguments);
        if(target[key]) return target?.[key].date;
        return false;
    }
};