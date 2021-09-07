import React from "react";
import { getConfig } from "@bigcommerce/storefront-data-hooks/api";
import getAllProducts from "@bigcommerce/storefront-data-hooks/api/operations/get-all-products";
import getProduct from "@bigcommerce/storefront-data-hooks/api/operations/get-product";
import useAddItem from "@bigcommerce/storefront-data-hooks/cart/use-add-item";
import { useState } from "react";
import useCart from "@bigcommerce/storefront-data-hooks/cart/use-cart";

export const getStaticPaths = async () => {
  const config = getConfig({ locale: "en-US" });
  const { products } = await getAllProducts({
    config,
    preview: true,
  });

  const productPaths = [];
  products.forEach((product) => {
    const stringPath = `${product.node.path}`;

    const strippedPath = stringPath.slice(1, stringPath.length - 1);

    productPaths.push({
      params: { productPath: strippedPath },
    });
  });
  return {
    paths: productPaths,
    fallback: false,
  };
};
export const getStaticProps = async (context) => {
  const config = getConfig({ locale: "en-US" });
  const productPath = context.params.productPath;
  const { product } = await getProduct({
    variables: { path: "/" + productPath + "/" },
    config,
    preview: false,
  });

  return { props: { product: product || null } };
};

const Products = (props) => {
  const [quantity, setQuantity] = useState(1);
  const [getchoice, setchoice] = useState([]);
  const [count, setCount] = useState(1);
  let variants = props.product.variants.edges;

  // const addItem = useAddItem();
  const countItem = (count, item) => count + item.quantity;
  const countItems = (count, items) => items.reduce(countItem, count);

  const CartNumber = () => {
    const { data } = useCart();
    const itemsCount = Object.values(data?.line_items ?? {}).reduce(
      countItems,
      0
    );
    return itemsCount > 0 ? <span>{itemsCount}</span> : null;
  };
  // console.log("props", props);
  const AddToCartButton = async () => {
    setCount(count + 1);
    let variant_id = await getVariantId();
    console.log(variant_id, variants, getchoice);
  };
  const getVariantId = async () => {
    let varnt = getData(variants);
    let colorValue = getchoice.Color;
    let sizeValue = getchoice.Size;
    let BrandValue = getchoice.Brand;
    for (let edge of varnt) {
      if (
        edge.options[0].label === colorValue &&
        edge.options[1].label === sizeValue &&
        edge.options[2].label === BrandValue
      ) {
        return edge.entityId;
      }
    }
  };
  const getData = (variants) => {
    let variantArray = new Array();
    variants.map((variant) => {
      let entityId = variant.node.entityId;
      let inventory = variant.node.inventory;
      let options = variant.node.productOptions.edges;
      let optArr = options.map((opt) => {
        let name = opt.node.displayName;
        let label = opt.node.values.edges[0].node.label;
        return {
          name: name,
          label: label,
        };
      });
      variantArray.push({
        entityId: entityId,
        options: optArr,
        inventory: inventory,
      });
    });

    return variantArray;
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="#">
                E-Commerce<span className="sr-only">(current)</span>
              </a>
            </li>
          </ul>
          <span className="navbar-text">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="25"
              fill="currentColor"
              className="bi bi-cart"
              viewBox="0 0 16 16"
              color="orange"
            >
              <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
            </svg>

            {/* <CartNumber /> */}
            <a href=""> {count} </a>
          </span>
        </div>
      </nav>
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className="card">
              <div className="card-body">
                <img
                  src={props.product.images.edges[0].node.urlOriginal}
                  width="500px"
                  height="300px"
                />
                <br></br>
                <p>{props.product.brand.name}</p>
                <h4>{props.product.name.replace("[Sample] ", "")}</h4>
                <h5 className="styles.price">
                  ₹{props.product.prices.price.value}
                </h5>
                <div></div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="card">
              <div className="card-body">
                <p>{props.product.brand.name}</p>
                <h4>{props.product.name.replace("[Sample] ", "")}</h4>
                <h5 style={{ color: "red" }}>
                  ₹{props.product.prices.price.value}
                </h5>
                <br></br>

                <h5>
                  {props.product.productOptions.edges[0].node.values.edges.map(
                    (edge, i) => {
                      let ColorVal = edge.node.label;
                      return (
                        <button
                          type="button"
                          className="btn btn-outline-secondary"
                          style={{ margin: "10px" }}
                          key={i}
                          onClick={() =>
                            setchoice(() => {
                              return {
                                ...getchoice,
                                Color: ColorVal,
                              };
                            })
                          }
                        >
                          {edge.node.label}
                        </button>
                      );
                    }
                  )}
                </h5>

                <h6>
                  {props.product.productOptions.edges[1].node.values.edges.map(
                    (edge, i) => {
                      let SizeVal = edge.node.label;
                      return (
                        <button
                          type="button"
                          className="btn btn-outline-secondary"
                          style={{ margin: "10px" }}
                          key={i}
                          onClick={() =>
                            setchoice(() => {
                              return {
                                ...getchoice,
                                Size: SizeVal,
                              };
                            })
                          }
                        >
                          {edge.node.label}
                        </button>
                      );
                    }
                  )}
                </h6>
                <h6>
                  {props.product.productOptions.edges[2].node.values.edges.map(
                    (edge, i) => {
                      let BrandVal = edge.node.label;

                      return (
                        <button
                          type="button"
                          className="btn btn-outline-secondary"
                          style={{ margin: "10px" }}
                          key={i}
                          onClick={() =>
                            setchoice(() => {
                              return {
                                ...getchoice,
                                Brand: BrandVal,
                              };
                            })
                          }
                        >
                          {edge.node.label}
                        </button>
                      );
                    }
                  )}
                </h6>
                <div>
                  <h4>
                    Quantity:{" "}
                    <input
                      type="number"
                      min={1}
                      value={quantity}
                      onChange={(e) => {
                        setQuantity(e.target.value);
                      }}
                    />
                  </h4>
                </div>
                <br></br>
                <button
                  type="button"
                  className="btn btn-success btn-lg"
                  onClick={() =>
                    AddToCartButton({
                      // productId: props.product.entityId,
                      // variantId: props.product.variants.edges[0].node.entityId,
                    })
                  }
                >
                  Add To cart
                </button>
                <br></br>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
