import { collection, query, where,getDocs } from "firebase/firestore";
import { db } from "../firebase";
export const getOrderStatusWise=async(conditionField,storeID)=>{
    let resultArray = [];
    let conditinoOne = where("shopID", "==", storeID);
    let conditionTwo=where("orderStatus", "==", conditionField);
    const baseQuery = query(collection(db, "OrderPage"), conditinoOne,conditionTwo);
    return getDocs(baseQuery).then((res) => {
        res.forEach((item) => {
            resultArray.push({ id: item.id, ...item.data() });
        })
        return {data:resultArray,error:false}
    })
    .catch((e)=>{
        return {data:[],error:true}
    })
}