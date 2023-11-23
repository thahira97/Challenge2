import "./Login.css";
import "./Register.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";
import img1 from "./assets/Img1.png";
import img2 from "./assets/Splash_1.png";
import img3 from "./assets/Splash_2.png";
import img4 from "./assets/Splash_4.png";
import axios from "axios";

export const Login = () => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 3,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 2,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const [input, setInput] = useState({
    emailOrUsername: "",
    password: "",
  });
  const history = useHistory();
  const [error, setError] = useState(null);
  const handleChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const login = async (input) => {
    const res = await axios.post("http://localhost:8000/login", input);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (input.password !== input.cpass) {
    //   setError("Password not matching");
    //   return;
    // }

    try {
      await login(input);
      history.push("/success");
    } catch (err) {
      setError(err.response.data);
    }
  };

  const googleAuth = () => {
    window.open(`http://localhost:8000/google/callback`, "_self");
  };

  return (
    <main className="main-container">
      <Carousel
        swipeable={true}
        draggable={false}
        showDots={true}
        responsive={responsive}
        ssr={true}
        infinite={true}
        autoPlaySpeed={1000}
        keyBoardControl={true}
        customTransition="all .5"
        transitionDuration={500}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
      >
        <img src={img1} alt="just a card" style={{ width: "500px" }}></img>

        <img src={img2} alt="just a card" style={{ width: "500px" }}></img>

        <img src={img3} alt="just a card" style={{ width: "500px" }}></img>

        <img src={img4} alt="just a card" style={{ width: "500px" }}></img>
      </Carousel>{" "}
      <Container>
        <div className="side-component">
          <form className="form-component">
            <Col sm={6} className="px-1">
              <input
                name="emailOrUsername"
                placeholder="Email or Username"
                onChange={handleChange}
                required
              ></input>
            </Col>
            <Col sm={6} className="px-1">
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                required
              ></input>
            </Col>
          </form>

          <div className="register-buttons">
            <Link to="/success">
              {" "}
              <button className="main-buttons" onClick={handleSubmit}>
                Login
              </button>
            </Link>
            <br></br>
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}
            <button className="main-buttons">Continue with Microsoft</button>
            <br></br>
            <button className="main-buttons">Continue with LinkedIn</button>
            <br></br>
            <button className="main-buttons">Continue with Google</button>
            <br></br>
            <button className="main-buttons">Continue with Apple</button>
            <br></br>
            <button className="main-buttons">Continue with Magnet</button>
          </div>
        </div>
        <br></br>
        <p>
          Don't have an account? <b>Sign up</b>{" "}
        </p>
      </Container>
    </main>
  );
};
