import DotLoader from "react-spinners/DotLoader";

const Loading = () => {
  const style = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };
  return (
    <div style={style}>
      <DotLoader color="#e11111" />
    </div>
  );
};

export default Loading;
