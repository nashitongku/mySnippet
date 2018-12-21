const TYPE = {
     Object: "[object Object]",
     Array: "[object Array]",
     Null: "[object Null]",
}
export default {
    CopyObject(obj, isDeep = true) {
        let res = {};

        if(typeof obj !== "object"){
            return obj;
        }

        Object.keys(obj).forEach((prop) => {
            let propValue = obj[prop];
            let type = this.getType(propValue);
            
            switch (type) {
                case TYPE.Object:
                    res[prop] = this.CopyObject(propValue);
                    break;
                case TYPE.Array:
                    res[prop] = [];
                    propValue.forEach((e, index) => {
                        res[prop].push(this.CopyObject(e))
                    });
                    
                    break;
                default:
                    res[prop] = propValue;
                    break;
            }
        })
        return res;
    },
    CopyArray(arr){
        let res = arr.map( item => {
            return this.CopyObject(item);
        });
        
        return res;
    },
    getType(target) {
        return Object.prototype.toString.call(target);
    }
}