import { Link } from "react-router-dom";

export default function ThanksForOrder() {
  return (
    <div className="container text-center pt-5" style={{ margin: "60px auto" }}>
      <div className="card p-4 my-5">
        {/* <img src="/gif/congrate.gif" style={{height: '300px'}}/> */}
        <h1 className="display-4 text-success" style={{fontWeight: "bold"}}>Thank You for Your Order!</h1>
        <p className="lead mt-3">
          We appreciate your order. We will get in touch with you shortly to
          confirm the details.
        </p>
        <hr className="my-4" />
        <p>Have a wonderful day!</p>
        <div>
            <Link to="/drop" className="btn btn-lg mt-4" style={{backgroundColor: 'red', borderRadius: '0px', color: "white", fontWeight: "bold"}}>
            Return to Drop Page
            </Link>
        </div>
      </div>
    </div>
  );
}
