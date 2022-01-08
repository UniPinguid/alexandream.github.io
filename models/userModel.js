const db = require('./db');
const tbName = "_USER";

module.exports = {
    all: async() => {
        const res = await db.load(tbName);
        return res;
    },
    get: async(fieldName,value) => {
        const res = await db.get(tbName,fieldName,value);
        if(res.length > 0){
            return res[0];
        }
        return null;
    },
    add: async(value) => {
        strValue = `'${Object.values(value)[0]}','${Object.values(value)[1]}','${Object.values(value)[2]}'`
        db.insert(tbName,strValue);
    }
}