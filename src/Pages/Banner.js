import React, { useEffect, useState } from "react";
import { doc, deleteDoc, query, getDocs } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../firebase";
import { NameSeperator } from "../helpers/NameSeparator";
function Banner() {
    const [titleImage, setTitleImage] = useState("");
    const [DownloadedUrl, setDownloadedUrl] = useState("");
    const [CateName, setCateName] = useState("");
    const [dataImg, setdataImg] = useState([]);
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
        // console.log(namesArray, "NAMESARRAY");
        setTitleImage(e.target.files[0].name);
        // console.log(e.target.files[0], "NAMESARRAY");
        // console.log(e.target.files[0].name, "FILLLLLLLE");
        const titleImageUrl = await getDownloadUrl(e.target.files[0]);
        // console.log(titleImageUrl, "LLL");
        setDownloadedUrl(titleImageUrl);
    };
    const createData = async () => {
        // console.log(CateName);
        if (DownloadedUrl == "") {
            alert("Please add atleast one Image")
        }
        else {
            await addDoc(collection(db, "Banner"), {
                BannerImg: DownloadedUrl,
            })
                .then((docRef) => {
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
                    ADD BANNER
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