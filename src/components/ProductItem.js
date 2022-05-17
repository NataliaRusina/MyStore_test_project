import React, { useEffect, useState, useContext } from "react";
import styles from "../CSS_modules/products.module.css";
import { AppContext } from '../App';


export default function ProductItem(props) {
    const { productList, setProductList, productListSorted,
        productChoosen,
        setProductChoosen } = useContext(AppContext);
    const { item } = props;


    const deleteItem = (e) => {
        console.log(e.target);
        let prodListCopy = [...productList];
        let newProdList = prodListCopy.filter(x => x && x.id !== item.id);
        setProductList(newProdList);
        setProductChoosen(productList[0]);
        localStorage.setItem('prodList', JSON.stringify(newProdList));
    }


    return (
        <div className={styles.prodItem} >
            <div style={{ width: '80%', display: 'flex', justifyContent: 'center', alignItems: 'center' }} onClick={() => setProductChoosen(item)}>
                <div style={{ width: '30%' }}>
                    <img src={item.image ? item.image : "https://www.freeiconspng.com/img/23485"} className={styles.imgSmall} />

                </div>
                <div style={{ width: '70%'}}>
                    {item.name}
                </div>
            </div>

            <div style={{ width: '20%', display: 'flex', justifyContent: 'center', alignItems: 'flex-end' }}>
                <button onClick={(e) => deleteItem(e)}>
                    Delete
                </button>
            </div>

        </div>
    );
}