import React from "react";
import Table from "react-bootstrap/Table";
import { useDispatch } from "react-redux";

import { IProduct } from "../interfaces/IProduct";
import { updateProductName } from "../store/productSlice";
import { AppDispatch } from "../store/store";

interface IProductTableProps {
  products: Array<IProduct>;
}

export const ProductsTable: React.FunctionComponent<IProductTableProps> = ({
  products,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const renameHandler = (id: string) => {
    const newName = prompt("Enter new Name");
    if (newName !== null) {
      dispatch(updateProductName({ id, newName }));
    }
  };

  return (
    <section>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>I18Name</th>
            <th>Model Number</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td onDoubleClick={() => renameHandler(product.id)}>
                {product.name}
              </td>
              <td>{product.i18name}</td>
              <td>{product.modelNumber}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </section>
  );
};
