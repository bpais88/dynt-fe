import { FC } from "react";

type Props = { loading: boolean };

const LoadingSpin: FC<Props> = ({ loading }) => {
  if (!loading) return null;
  return <span className="loading loading-spinner"></span>;
};

export default LoadingSpin;
