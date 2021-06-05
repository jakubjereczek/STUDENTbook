import './MainContainer.css';

interface ContainerProps {
  name: string;
}

const MainContainer: React.FC<ContainerProps> = (props) => {
  return (
    <div className="container">
      {props.children}
    </div>
  );
};

export default MainContainer;
