import PropTypes from "prop-types";
import Button from "./Button";

const Header = ({ title, onClick, showAdd }) => {
  return (
    <header className="header">
      <h1>{title}</h1>
      <Button
        text={showAdd ? "Close" : "Add"}
        color={showAdd ? "red" : "green"}
        onClick={onClick}
      />
    </header>
  );
};

Header.defaultProps = {
  title: "Task Tracker",
};

Header.propTypes = {
  title: PropTypes.string,
};

// Css in JS
// const headingStyle = {
//   display: "flex",
//   justifyContent: "center",
// };

export default Header;
