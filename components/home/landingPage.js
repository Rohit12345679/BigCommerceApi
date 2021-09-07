import { useRouter } from "next/router";
import Navbar from "../../components/Shared/navbar";
import Link from "next/link";
const LandingPage = (props) => {
  console.log(props);
  const router = useRouter();
  return (
    <>
      <style jsx>
        {`
          p {
            color: rgb(192, 192, 192);
          }

          h6 {
            color: black;
            font-size: bold;
          }
        `}
      </style>
      <Navbar />

      <div className="container">
        <div className="row">
          {props.data.map((element, key) => (
            <div className="col-md-4" key={key}>
              <div className="card">
                <div className="card-body">
                  <Link href={"/product" + element.node.path}>
                    <a>
                      <img
                        src={element.node.images.edges[0].node.urlOriginal}
                        width="280px"
                        height="250px"
                      />
                      <p>{element.node.brand.name}</p>
                      <h6>
                        {element.node.name.replace("[Sample] ", "")}
                        <br></br>
                      </h6>
                      <h6>₹{element.node.prices.price.value}</h6>
                      <button type="button" className="btn btn-success">
                        Buy now
                      </button>
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default LandingPage;
