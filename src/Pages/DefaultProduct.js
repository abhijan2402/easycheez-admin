import React, { useEffect, useState } from 'react'
import { doc, deleteDoc, query, getDocs } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../firebase";
import { NameSeperator } from "../helpers/NameSeparator";
import { ColorRing } from 'react-loader-spinner';
function DefaultProduct() {
    const [ProductName, setProductName] = useState("")
    const [titleImage, setTitleImage] = useState("");
    const [DownloadedUrl, setDownloadedUrl] = useState("");
    const [CateName, setCateName] = useState("");
    const [dataImg, setdataImg] = useState([]);
    const [groTrue, setgroTrue] = useState(true)
    const [ActiveType, setActiveType] = useState("grocery")
    const [disable, setdisable] = useState(false)
    const [CatePrice, setCatePrice] = useState("")
    const [CategoryData, setCategoryData] = useState([])

    const [CategoryDataFood, setCategoryDataFood] = useState([
        {
            label: "Veg",
            value: "Veg"
        },
        {
            label: "NonVeg",
            value: "NonVeg"
        },
    ])

    const [SelcetdCat, setSelcetdCat] = useState("")
    const [loader, setloader] = useState(false)

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
        setloader(true)
        console.log(CateName);
        if (ProductName == "") {
            alert("Please fill Product Name")
            setloader(false)
        }
        else if (DownloadedUrl == "") {
            alert("Please Add Image again")
            setloader(false)
        }
        else if (CatePrice == "") {
            alert("Please Add Price")
            setloader(false)
        }
        // else if (SelcetdCat == "") {
        //     alert("Please select Category once again")
        //     setloader(false)
        // }
        if (groTrue && SelcetdCat == "") {
            alert("Please select grocery Category once again")
            setloader(false)

        }
        else if (!groTrue && CategoryDataFood == "") {
            alert("Please select food Category once again")
            setloader(false)

        }

        else {
            setdisable(true)

            await addDoc(collection(db, groTrue ? "grocery" : "food"), {
                Category: groTrue ? "grocery" : "food",
                ProImage: DownloadedUrl,
                ProductName: ProductName,
                ProductPrice: CatePrice,
                CategoryType: groTrue ? SelcetdCat : CategoryDataFood

            })
                .then((docRef) => {
                    console.log(docRef, "I am console");
                    alert("Item added")
                    setdisable(false)
                    setloader(false)
                    getData()
                    return docRef.id;

                })
                .catch((e) => {
                    alert("Some thing gonna wrond Please try again");
                    setloader(false)
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
    const getCategoryData = async () => {
        let resultArray = [];
        const q = query(collection(db, "Category"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            resultArray.push({ id: doc.id, ...doc.data() });
        });
        console.log(resultArray, "CATEGORY_DATA");
        setCategoryData(resultArray);
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
    useEffect(() => {
        getCategoryData()
    }, [])

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
                    placeholder="Product Price"
                    onChange={(e) => {
                        setCatePrice(e.target.value);
                    }}
                    style={{ width: "45%", padding: "10px 10px", borderRadius: "5px", marginTop: "10px" }}
                />
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-around", width: "45%", marginTop: "15px" }}>
                    <div onClick={() => { setgroTrue(true) }} style={{ background: groTrue ? "blue" : "white", padding: "10px 20px", color: groTrue ? 'white' : "black", borderRadius: "8px", border: "1px solid blue" }}>Grocery</div>
                    <div onClick={() => { setgroTrue(false) }} style={{ background: groTrue ? "white" : "blue", padding: "10px 20px", color: groTrue ? 'black' : "white", borderRadius: "8px", border: "1px solid blue" }}>Food</div>
                </div>
                {
                    groTrue ?
                        <select value={SelcetdCat} onChange={(e) => { setSelcetdCat(e.target.value); }} style={{ width: "45%", padding: "10px 10px", borderRadius: "5px", marginTop: "10px" }}>
                            {
                                CategoryData?.map((item) => (
                                    <option value={item?.CatName}>{item?.CatName}</option>
                                ))
                            }
                        </select> :
                        <select value={CategoryDataFood} onChange={(e) => { setCategoryDataFood(e.target.value); }} style={{ width: "45%", padding: "10px 10px", borderRadius: "5px", marginTop: "10px" }}>
                            <option value="Veg">Veg</option>
                            <option value="NonVeg">NonVeg</option>
                        </select>
                }

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

                <button
                    disabled={disable ? true : false}
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
                    {
                        loader ?
                            <ColorRing
                                visible={true}
                                height="25"
                                width="25"
                                ariaLabel="blocks-loading"
                                wrapperStyle={{}}
                                wrapperClass="blocks-wrapper"
                                colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                            /> : "ADD PRODUCT"
                    }

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
                            <h3 style={{ textAlign: "center", width: "100%", fontSize: "1em", fontWeight: "700" }}>Price : {item?.ProductPrice}</h3>

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