import {Spinner as SpinnerNext} from "@nextui-org/spinner"

interface SpinnerProps {
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  labelColor?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  classNames?: string;
  [key: string]: any; // for any additional props
}

const Spinner = ({
  label,
  size = 'sm',
  color = 'default',
  labelColor = 'default',
  classNames,
  ...props
}: SpinnerProps) => {
  return (
    <div className={`${classNames} flex items-center justify-center`}>
      <SpinnerNext size={size} color={color} {...props} />
      {label && <span style={{ color: labelColor }}>{label}</span>}
    </div>
  );
};

export default Spinner;