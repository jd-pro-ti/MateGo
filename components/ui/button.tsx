import { Button as ButtonPrimitive } from '@base-ui/react/button';

import { cn } from '@/lib/utils';

type ButtonVariant = 'ghost' | 'outline';
type ButtonSize = 'icon-sm';

function Button({
  className,
  variant = 'outline',
  size = 'icon-sm',
  ...props
}: ButtonPrimitive.Props & {
  variant?: ButtonVariant;
  size?: ButtonSize;
}) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(
        'ui-button',
        `ui-button-${variant}`,
        `ui-button-${size}`,
        className,
      )}
      {...props}
    />
  );
}

export { Button };
