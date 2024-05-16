import { Link } from "react-router-dom";
const NotFound = () => {
  return (
    <section className="page notfound">
      <div className="content">
        <img src="/notfound.png" alt="not found" />
        <Link to={"/"}>RETURN TO HOME </Link>
      </div>
    </section>
  );
};

export default NotFound;
