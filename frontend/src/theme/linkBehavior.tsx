import { Link as LocalizedNextLink } from '@/localization/localizedNavigation';
import { forwardRef } from 'react';

export const LinkBehavior = forwardRef(function LinkBehavior(
  props: any,
  ref: any,
) {
  return <LocalizedNextLink ref={ref} {...props} />;
});
