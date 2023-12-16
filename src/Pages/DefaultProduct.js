import React, { useEffect, useState } from 'react'
import { doc, deleteDoc, query, getDocs } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../firebase";
import { NameSeperator } from "../helpers/NameSeparator";
function DefaultProduct() {
    const [ProductName, setProductName] = useState("")
    const [titleImage, setTitleImage] = useState("");
    const [DownloadedUrl, setDownloadedUrl] = useState("");
    const [CateName, setCateName] = useState("");
    const [dataImg, setdataImg] = useState([]);
    const [groTrue, setgroTrue] = useState(true)
    const [ActiveType, setActiveType] = useState("grocery")
    const getDownloadUrl = async (file) => {
        console.log(file, "I MA FILE");
        const storageRef = ref(storage, `/default_product/${file?.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        return new Promise((resolve, reject) => {
            uploadTask.on(
                "state_changed",
                (snapshot) => { },
                (error) => {
                    reject(error);
                },
                async () => {
                    try {
                        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                        console.log(downloadURL, "DOWNLAOD URL");
                        resolve(downloadURL);
                    } catch (e) {
                        reject(false);
                    }
                }
            );
        });
    };

    const UploadImge = async (e) => {
        const namesArray = NameSeperator(e.target.files[0].type);
        console.log(namesArray, "NAMESARRAY");
        setTitleImage(e.target.files[0].name);
        console.log(e.target.files[0], "NAMESARRAY");
        console.log(e.target.files[0].name, "FILLLLLLLE");
        const titleImageUrl = await getDownloadUrl(e.target.files[0]);
        console.log(titleImageUrl, "IMAGEURL");
        setDownloadedUrl(titleImageUrl);
    };
    const createData = async () => {
        console.log(CateName);
        if (ProductName == "" || DownloadedUrl == "") {
            alert("Please fill all the details")
        }
        else {
            await addDoc(collection(db, groTrue ? "grocery" : "food"), {
                Category: groTrue ? "grocery" : "food",
                ProImage: DownloadedUrl,
                ProductName: ProductName

            })
                .then((docRef) => {
                    console.log(docRef, "I am console");
                    getData()
                    return docRef.id;

                })
                .catch((e) => {
                    alert("Some thing gonna wrond Please try again");
                });
        }
    };

    const getData = async () => {
        let resultArray = [];
        const q = query(collection(db, ActiveType));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            resultArray.push({ id: doc.id, ...doc.data() });
        });
        setdataImg(resultArray);
        console.log(dataImg);
    };

    const delData = async (item) => {
        console.log(item);
        try {
            //   await StorageDeletion(item);
            await deleteDoc(doc(db, ActiveType, item.id));
            alert("Item deleted")
            getData();
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getData();
    }, [ActiveType]);
    return (
        <>
            <h1 style={{ textAlign: "center" }}>Default Product</h1>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <input
                    placeholder="Product Name"
                    onChange={(e) => {
                        setProductName(e.target.value);
                    }}
                    style={{ width: "45%", padding: "10px 10px", borderRadius: "5px" }}
                />
                <input
                    placeholder="select Image"
                    onChange={(val) => {
                        UploadImge(val);
                    }}
                    type="file"
                    style={{
                        width: "45%",
                        padding: "10px 10px",
                        borderRadius: "5px",
                        border: "1px solid black",
                        marginTop: 10,
                    }}
                />
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-around", width: "45%", marginTop: "15px" }}>
                    <div onClick={() => { setgroTrue(true) }} style={{ background: groTrue ? "blue" : "white", padding: "10px 20px", color: groTrue ? 'white' : "black", borderRadius: "8px", border: "1px solid blue" }}>Grocery</div>
                    <div onClick={() => { setgroTrue(false) }} style={{ background: groTrue ? "white" : "blue", padding: "10px 20px", color: groTrue ? 'black' : "white", borderRadius: "8px", border: "1px solid blue" }}>Food</div>
                </div>
                <button
                    onClick={createData}
                    style={{
                        width: "45%",
                        margin: "10px 0px ",
                        backgroundColor: "blue",
                        color: "white",
                        padding: "10px 0px",
                        border: "0px",
                    }}
                >
                    ADD PRODUCT
                </button>
            </div>
            <div style={{ display: "flex", flexDirection: "row", width: "100%", }}>
                <h2 onClick={() => { setActiveType("grocery") }} style={{ borderBottom: ActiveType == "grocery" ? "4px solid blue" : "0px", width: "50%", textAlign: "center" }}>Grocery</h2>
                <h2 onClick={() => { setActiveType("food") }} style={{ borderBottom: ActiveType == "food" ? "4px solid blue" : "0px", width: "50%", textAlign: "center" }}>Food</h2>
            </div>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                {dataImg?.map((item, index) => (
                    <>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                border: "1px solid blue",
                                margin: "4px 10px",
                                borderRadius: "3px",
                                width: 250
                            }}
                        >
                            <img
                                src={item?.ProImage}
                                style={{ width: "100%", height: 200, alignItems: "center" }}
                            />
                            <h3 style={{ textAlign: "center", width: "100%", fontSize: "1em" }}>{item?.ProductName}</h3>
                            <button
                                onClick={() => {
                                    delData(item);
                                }}
                                style={{
                                    width: "100%",
                                    backgroundColor: "blue",
                                    color: "white",
                                    border: "0px",
                                    borderRadius: "3px",
                                }}
                            >
                                DELETE
                            </button>
                        </div>
                    </>
                ))}
            </div>
        </>
    )
}

export default DefaultProduct