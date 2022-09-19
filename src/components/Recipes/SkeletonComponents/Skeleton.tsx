import './SkeletonItem.css';

interface Props {
  styleContainer: string
}
const Skeleton = ({ styleContainer }: Props) => {
  return (
  <div className="skeleton">
   <div className={styleContainer}> </div>
  </div>
  );
};

export default Skeleton;