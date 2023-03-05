import { ComponentProps, FC, PropsWithChildren } from 'react';
import { Button as ButtonFlowbite, Spinner } from 'flowbite-react';

interface ButtonProps {
  onClick?: ComponentProps<'button'>['onClick'];
  color?: ComponentProps<typeof ButtonFlowbite>['color'];
  size?: ComponentProps<typeof ButtonFlowbite>['size'];
  isLoading?: boolean;
}

export const Button: FC<PropsWithChildren<ButtonProps>> = ({
  children,
  onClick,
  isLoading,
  color,
  size,
}) => {
  return (
    <ButtonFlowbite
      onClick={onClick}
      disabled={isLoading}
      color={color}
      size={size}
    >
      {isLoading ? (
        <>
          <div className="mr-3">
            <Spinner size="sm" light={true} />
          </div>
          Loading ...
        </>
      ) : (
        children
      )}
    </ButtonFlowbite>
  );
};
