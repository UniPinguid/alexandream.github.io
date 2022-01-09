const db = require('./db');
const tbName = "SACH";

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
        strValue = `${value.IDSACH},'${value.TENSACH}','${value.THELOAI}','${value.TACGIA}',${value.NAMXUATBAN},'${value.NHAXUATBAN}','${value.NGAYNHAP}',${value.TRIGIA},'${value.NGUOINHAN}','${value.MUONSACH}'`;
        db.insert(tbName,strValue);
    }
}