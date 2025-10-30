import React from 'react';
import {
  describe, it, expect, vi,
} from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import InputForm from './InputForm';

/**
 * Skenario Pengujian untuk komponen InputForm:
 *
 * 1. should render the label correctly
 * - harus me-render label yang dikirim melalui props.
 *
 * 2. should call onChange function when user typing
 * - harus memanggil fungsi onChange ketika pengguna mengetik.
 */

describe('InputForm component', () => {
  // Test Case 1
  it('should render the label correctly', () => {
    // Arrange
    render(
      <InputForm
        id="email"
        label="Email"
        name="email"
        value=""
        onChange={() => {}}
      />,
    );
    // Act
    const labelElement = screen.getByText('Email');
    // Assert
    expect(labelElement).toBeInTheDocument();
  });
  it('should call onChange function when user typing', async () => {
    const mockOnChange = vi.fn();

    // Wrapper untuk membuat input menjadi "controlled" beneran
    const Wrapper = () => {
      const [value, setValue] = React.useState('');
      return (
        <InputForm
          id="email"
          label="Email"
          name="email"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            mockOnChange(e);
          }}
          placeholder="Masukkan email"
        />
      );
    };

    render(<Wrapper />);
    const inputElement = screen.getByPlaceholderText('Masukkan email');

    await userEvent.type(inputElement, 'test');

    expect(mockOnChange).toHaveBeenCalledTimes(4);
    expect(mockOnChange.mock.calls[3][0].target.value).toBe('test');
  });
});