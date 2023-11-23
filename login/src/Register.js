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
import recaptcha from "./assets/RecaptchaLogo.svg.png";
import axios from "axios";
// import { AuthContext } from './AuthContext';

export const Register = () => {
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
    firstname: "",
    lastname: "",
    password: "",
    username: "",
    email: "",
    cpass: "",
  });

  const [error, setError] = useState(null);
  const history = useHistory();
  axios.defaults.withCredentials = true;

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(input);
    const trimmedValue = value.trim();

    setInput((prev) => ({ ...prev, [name]: trimmedValue }));
  };

  const signup = async (input) => {
    const res = await axios.post("http://localhost:8000/signup", input);
    // setCurrentUser(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !input.firstname ||
      !input.lastname ||
      !input.email ||
      !input.password ||
      !input.cpass
    ) {
      setError("Please fill in all required fields");
      return;
    }

    if (input.password !== input.cpass) {
      setError("Password not matching");
      return;
    }

    try {
      await signup(input);
      history.push("/login");
    } catch (err) {
      console.log(err);
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
                required
                type="text"
                name="firstname"
                placeholder="First name"
                onChange={handleChange}
              ></input>
            </Col>
            <Col sm={6} className="px-1">
              <input
                type="text"
                name="lastname"
                placeholder="Last name"
                onChange={handleChange}
                required
              ></input>
            </Col>
            <Col sm={6} className="px-1">
              <input
                type="text"
                name="username"
                placeholder="Username"
                onChange={handleChange}
                required
              ></input>
            </Col>
            <Col sm={6} className="px-1">
              <input
                type="email"
                name="email"
                placeholder="Email"
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
            <Col sm={6} className="px-1">
              <input
                type="password"
                name="cpass"
                placeholder="Confirm Password"
                onChange={handleChange}
                required
              ></input>
            </Col>
          </form>
          <div>
            <b>
              <h4>Strength</h4>
            </b>
            <h4>Password must include :</h4>
            <ul>
              <li>8 to 14 characters</li>
              <li>1 uppercase letter</li>
              <li>1 lowercase letter</li>
              <li>1 number</li>
              <li>1 special character</li>
              <p>{`@#$%^&*?_~-()+={}[]|;:'“<>/,.`}</p>
            </ul>
          </div>
          <br></br>
          <div className="drop-box">
            <select name="Learner">
              <option>Learner</option>
              <option>Job Seeker</option>
              <option>Employee</option>
              <option>Founder</option>
              <option>Educator</option>
              <option>Mentor</option>
            </select>
            <select name="english">
              <option>English</option>
              <option>French</option>
            </select>
          </div>
          <div className="check">
            <input type="checkbox"></input>
            I'm not a robot
            <img src={recaptcha} style={{ width: "50px" }}></img>
          </div>{" "}
          <p>
            {" "}
            By registering, you agree to the Prepr Terms of use, Privacy policy
            and cookie policy
          </p>
          <br></br>
          <div className="register-buttons">
            <Link to="/login">
              {" "}
              <button className="main-buttons" onClick={handleSubmit}>
                Register
              </button>
            </Link>
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}
            or
            <button className="main-buttons">Continue with Microsoft</button>
            <br></br>
            <button className="main-buttons">Continue with LinkedIn</button>
            <br></br>
            <button className="main-buttons" onClick={googleAuth}>
              Continue with Google
            </button>
            <br></br>
            <button className="main-buttons">Continue with Apple</button>
            <br></br>
            <button className="main-buttons">Continue with Magnet</button>
          </div>
        </div>
        <br></br>
        <p>
          Already have an account? <b>Log in</b>{" "}
        </p>
        <p>
          Are you an organization? <b>Organization register</b>
        </p>
      </Container>
    </main>
  );
};
