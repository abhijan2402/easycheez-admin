import React, { useEffect, useState } from "react";
import { doc, deleteDoc, query, getDocs } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../firebase";
import { NameSeperator } from "../helpers/NameSeparator";
import { ColorRing } from 'react-loader-spinner'

function Banner() {
    const [titleImage, setTitleImage] = useState("");
    const [DownloadedUrl, setDownloadedUrl] = useState("");
    const [CateName, setCateName] = useState("");
    const [dataImg, setdataImg] = useState([]);
    const [disable, setdisable] = useState(false)
    const [Bannertype, setBannertype] = useState(false)
    const [loader, setloader] = useState(false)
    const getDownloadUrl = async (file) => {
        const storageRef = ref(storage, `/Banner/${file?.name}`);
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
                        // console.log(downloadURL, "DOWNLAOD URL");
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
        setTitleImage(e.target.files[0]);
    };
    const createData = async () => {
        setloader(true)
        setdisable(true)
        // console.log(CateName);
        const titleImageUrl = await getDownloadUrl(titleImage)
        console.log(titleImageUrl, "IMGG");
        setDownloadedUrl(titleImageUrl);
        if (titleImageUrl == "") {
            alert("Please add atleast one Image")
            setloader(false)
        }
        else {
            await addDoc(collection(db, "Banner"), {
                BannerImg: titleImageUrl,
                BannerType: Bannertype ? "User" : "Seller"
            })
                .then((docRef) => {
                    alert("Banner added")
                    getData()
                    setdisable(false)
                    setloader(false)
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
        const q = query(collection(db, "Banner"));
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
            await deleteDoc(doc(db, "Banner", item.id));
            getData();
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <>
            <h1 style={{ textAlign: "center" }}>BANNER</h1>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >

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
                    <div onClick={() => { setBannertype(true) }} style={{ background: Bannertype ? "blue" : "white", padding: "10px 20px", color: Bannertype ? 'white' : "black", borderRadius: "8px", border: "1px solid blue" }}>USER</div>
                    <div onClick={() => { setBannertype(false) }} style={{ background: Bannertype ? "white" : "blue", padding: "10px 20px", color: Bannertype ? 'black' : "white", borderRadius: "8px", border: "1px solid blue" }}>SELLER</div>
                </div>
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
                            /> : "ADD BANNER"
                    }
                    {/* ADD BANNER */}
                </button>
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
                {dataImg.map((item, index) => (
                    <>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                border: "1px solid blue",
                                margin: "4px 10px",
                                borderRadius: "3px",
                            }}
                        >
                            <img
                                src={item?.BannerImg}
                                style={{ width: 300, height: 250, alignItems: "center" }}
                            />
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

export default Banner