import { TiLocationArrowOutline } from "react-icons/ti";

const WindDirectionRotatedIcon = ({ deg }: { deg: number | undefined }) => {
  return (
    <TiLocationArrowOutline size={25} style={{ transform: deg ? `rotateZ(${deg - 45}deg)` : '' }} />
  );
};

export default WindDirectionRotatedIcon;
