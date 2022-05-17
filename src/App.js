import React, { useEffect, useState } from "react";
import './App.css';
import ProductChoosen from "./components/ProductChoosen";
import ProductItem from "./components/ProductItem";
import prod_1 from "./Images/prod_1.jpg";
import prod_2 from "./Images/prod_2.jpg";
import prod_3 from "./Images/prod_3.jpg";


const initialProductList = [
  {
    id: 1,
    name: 'Paris',
    image: prod_1,
    description: 'Paris offers something for everyone. It boasts rich culture and art, both in museums and galleries as well as on streets and in theatres. Get captivated by rich palaces and romantic gardens. ',
    price: 500,
    creationDate: new Date(2022, 5, 17),
  },
  {
    id: 2,
    name: 'Birds',
    image: prod_2,
    description: 'Birds are a group of warm-blooded vertebrates constituting the class Aves /ˈeɪviːz/, characterised by feathers, toothless beaked jaws, the laying of hard-shelled eggs, a high metabolic rate, a four-chambered heart, and a strong yet lightweight skeleton. Birds live worldwide and range in size from the 5.5 cm (2.2 in)',
    price: 90,
    creationDate: new Date(2022, 5, 17),
  },
  {
    id: 3,
    name: 'Flowers',
    image: prod_3,
    description: 'A flower, sometimes known as a bloom or blossom, is the reproductive structure found in flowering plants (plants of the division Angiospermae). The biological function of a flower is to facilitate reproduction, usually by providing a mechanism for the union of sperm with eggs. ',
    price: 130,
    creationDate: new Date(2022, 5, 17),
  },


]


export const AppContext = React.createContext(null);

export default function App() {



  const [productList, setProductList] = useState([]);

  const [productChoosen, setProductChoosen] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [sorting, setSorting] = useState('recently added');
  const [productListSorted, setProductListSorted] = useState(productList);

  useEffect(() => {

    let prodListCopy = [...productList];
    if (productList) {
      if (sorting === 'recently added') {
        prodListCopy.sort((a, b) => a.id < b.id ? 1 : -1);
      } else if (sorting === 'price') {
        prodListCopy.sort((a, b) => a.price > b.price ? 1 : -1);
      }
      console.log(prodListCopy);
      setProductListSorted(prodListCopy);
    }

  }, [productList, sorting]);

  useEffect(() => {
    let list = localStorage.getItem('prodList');
    if(list) list = JSON.parse(list);
    console.log(list);
    if(list && list.length){
      setProductList(list);
      setProductChoosen(list[0]);
    } else {
      setProductList(initialProductList);
      setProductChoosen(initialProductList[0]);
    }
  }, [])

  useEffect(() => {
    console.log(productList);
    if (!productList || !productList.length) {
      setProductChoosen(null);
    }
  }, [productList]);

  const createNewProduct = () => {
    let obj = {
      id: Date.now(),
      name: 'New product',
      image: '',
      description: 'Description',
      price: 0,
      creationDate: null,
    }
    setProductChoosen(obj);

  }

  const handleSearch = (e) => {
    setSearchText(e.target.value.toLowerCase())
  }

  const sortList = (a, b) => a.name !== b.name ? a.name.localeCompare(b.name) : a.id.localeCompare(b.id)

  const filterSearch = (x) => {

    if (x) {
      return x.name.toLowerCase().includes(searchText)
    } else {
      return false;
    }

  }

  const handleChangeSorting = (e) => {
    setSorting(e.target.value);
  }


  return (
    <AppContext.Provider
      value={{
        productList,
        setProductList,
        productChoosen,
        setProductChoosen,
        productListSorted
      }}>
      <div className="App">

        <div className="header">My Store</div>
        <div className="topBar">
          <div className="topBarItem">
            <button onClick={createNewProduct}>
              Add
            </button>

          </div>
          <div className="topBarItem">
            <label> Search</label>
            <input type={'text'} onChange={handleSearch} style={{width: '50%', marginLeft: '20px'}}/>
          </div>
          <div className="topBarItem">
            <label for="sorting">Sort by:</label>
            <select name="sorting" id="sorting" value={sorting} onChange={handleChangeSorting} style={{marginLeft: '20px'}}>
              <option value="recently added">recently added</option>
              <option value="price">price</option>
            </select>
          </div>
        </div>
        <div className="container">

          <div className="productList">


            {productListSorted && productListSorted.length ? productListSorted.filter(x => filterSearch(x)).map((item, index) => {
              return <ProductItem key={index} index={index} item={item} />
            })
              :
              null
            }
          </div>

          <ProductChoosen />
        </div>







      </div>
    </AppContext.Provider>

  );
}

