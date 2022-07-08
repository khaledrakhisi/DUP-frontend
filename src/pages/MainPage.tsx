import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "../components/Button";
import LoadingSpinner from "../components/LoadingSpinner";
import { ProductsTable } from "../components/ProductsTable";
import {
  getAllProducts,
  saveChanges,
  selectProducts,
} from "../store/productSlice";
import { AppDispatch } from "../store/store";

import classes from "./MainPage.module.scss";

export const MainPage = () => {
  const { products, isLoading, error } = useSelector(selectProducts);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  return (
    <section className={classes.mainPage}>
      {isLoading && <LoadingSpinner asOverlay />}
      {Boolean(error) && <p>{error}</p>}

      <div className={classes.controls}>
        <p>
          For rename double click on the Name itself. To save the changes click
          on SAVE button
        </p>
        <Button
          onClick={() => {
            dispatch(saveChanges(products));
          }}
        >
          Save
        </Button>
      </div>

      {products && products.length > 0 && <ProductsTable products={products} />}
    </section>
  );
};
