const Button = () => {
  const addItem = useAddItem();
  return (
    <div>
      <button
        type="button"
        className="btn btn-success btn-lg"
        onClick={async () => {
          // console.log(props.product.entityId);
          // console.log(props.product.variants.edges[0].node.entityId)
          const res = await addItem({
            productId: props.product.entityId,
            variantId: props.product.variants.edges[0].node.entityId,
          });
          console.log("rrrrr", res);
        }}
      >
        Add To cart
      </button>
    </div>
  );
};
export default Button;
