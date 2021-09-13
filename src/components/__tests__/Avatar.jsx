import React from 'react';
import { render } from '@testing-library/react';

import Avatar from '../Avatar';
import styles from '../Avatar.module.scss';

const src = 'http://i.pravatar.cc/40?u=1547cbe1-e06a-417e-97dc-ce1de248d4e9';
describe('Avatar', () => {
  it('should render an img with the provided src and an empty alt string for accessibility', () => {
    const { getByRole } = render(<Avatar src={src} />);

    const img = getByRole('img');
    expect(img).toHaveAttribute('src', src);
    expect(img).toHaveAttribute('alt', '');
  });

  it('should render provided children instead of an img if it exists', () => {
    const { getByRole, getByTestId } = render(
      <Avatar src={src}>
        <div data-testid="custom" />
      </Avatar>
    );

    expect(() => getByRole('img')).toThrow();
    expect(getByTestId('custom')).toBeInTheDocument();
  });

  it('should apply the correct class names', () => {
    const { rerender, container } = render(<Avatar src={src} />);
    const avatar = container.firstElementChild;
    if (!avatar) {
      throw new Error('Avatar not found');
    }

    expect(avatar).toHaveClass(styles.avatar);
    expect(avatar).not.toHaveClass(styles.small);

    rerender(<Avatar src={src} small />);

    expect(avatar).toHaveClass(styles.avatar);
    expect(avatar).toHaveClass(styles.small);
  });
});
