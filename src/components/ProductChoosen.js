import React, { useEffect, useState, useContext } from "react";
import styles from "../CSS_modules/products.module.css";
import { AppContext } from '../App';

export default function ProductChoosen() {
    const {
        productList,
        setProductList,
        productChoosen,
        setProductChoosen
    } = useContext(AppContext);



    const handleChangeProduct = (e) => {
        let prodCopy = { ...productChoosen };
        prodCopy[e.target.name] = e.target.value;
        setProductChoosen(prodCopy);

    }

    const handleSave = () => {
        let productChoosenCopy = { ...productChoosen };

        let prodListCopy = [...productList];
        let prod = prodListCopy.find(x => x && x.id === productChoosen.id);
        let index = prodListCopy.indexOf(prod);
        console.log(index);
        if (index > -1) {
            productChoosenCopy.creationDate = Date.now();
            prodListCopy.splice(index, 1, productChoosenCopy);
            setProductList(prodListCopy);
            localStorage.setItem('prodList', JSON.stringify(prodListCopy));

        } else {
            productChoosenCopy.creationDate = Date.now();
            prodListCopy.unshift(productChoosenCopy);
            setProductList(prodListCopy);
            localStorage.setItem('prodList', JSON.stringify(prodListCopy));
        }


    }

    const onFileUpload = () => {

    }





    return (<div className={styles.prodChoosen} > {productChoosen ?
        <div className={styles.productCard} >
            <div className={styles.cardPart} >
                { /* {productChoosen.image} */}
                <img src={productChoosen.image ? productChoosen.image : "https://www.freeiconspng.com/img/23485"}
                    className={styles.imgSmall}
                    onClick={onFileUpload}
                />
                <label > Image URL </label>
                <input type={'text'}
                    value={productChoosen.image}
                    name='image'
                    onChange={handleChangeProduct}
                />
            </div>

            <div className={styles.cardPart} >

                <label > Name </label>
                <input type={'text'}
                    value={productChoosen.name}
                    name='name'
                    onChange={handleChangeProduct}
                />
            </div >

            <div className={styles.cardPart} >

                <label > Description </label>
                < textarea type={'text'}
                    value={productChoosen.description}
                    name='description'
                    onChange={handleChangeProduct}
                />
            </div >

            <div className={styles.cardPart} >

                <label > Price </label>
                <input type={'number'}
                    value={productChoosen.price}
                    name='price'
                    style={{width: '20%'}}
                    onChange={handleChangeProduct}
                />  
                </div >

            <div className={styles.cardPart} >
                <button onClick={handleSave}
                    disabled={!productChoosen.name || !productChoosen.description || !productChoosen.price || !productChoosen.image} > Save </button>

            </div>

        </div>


        :
        'Select product'
    }

    </div>
    );
}