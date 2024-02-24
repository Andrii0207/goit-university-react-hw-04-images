import { RotatingLines } from 'react-loader-spinner';
import { Loader } from './Loader.styled';

export default function Spinner() {
  return (
    <Loader>
      <RotatingLines
        visible={true}
        height="65"
        width="65"
        color="#3f51b5" // Defaults to "grey" - color don`t work
        strokeWidth="4"
        animationDuration="0.75"
        ariaLabel="rotating-lines-loading"
        wrapperStyle={{}} // styles don`t work
        wrapperClass=""
      />
    </Loader>
  );
}
