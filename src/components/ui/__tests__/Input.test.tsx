import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from '../Input';
import '@testing-library/jest-dom';

describe('Input Component', () => {
  // Basic rendering tests
  it('renders correctly with default props', () => {
    render(<Input />);
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'text');
    expect(input).not.toHaveAttribute('required');
  });

  it('applies different variants correctly', () => {
    const { rerender } = render(<Input variant="default" data-testid="input" />);
    let input = screen.getByTestId('input');
    expect(input).toHaveClass('bg-white');

    rerender(<Input variant="filled" data-testid="input" />);
    input = screen.getByTestId('input');
    expect(input).toHaveClass('bg-gray-100');

    rerender(<Input variant="outlined" data-testid="input" />);
    input = screen.getByTestId('input');
    expect(input).toHaveClass('bg-transparent');
  });

  it('applies different sizes correctly', () => {
    const { rerender } = render(<Input size="md" data-testid="input" />);
    let input = screen.getByTestId('input');
    expect(input).toHaveClass('py-2');

    rerender(<Input size="sm" data-testid="input" />);
    input = screen.getByTestId('input');
    expect(input).toHaveClass('py-1');

    rerender(<Input size="lg" data-testid="input" />);
    input = screen.getByTestId('input');
    expect(input).toHaveClass('py-3');
  });

  // Label tests
  it('renders label when provided', () => {
    render(<Input label="Username" />);
    expect(screen.getByText('Username')).toBeInTheDocument();
  });

  it('shows required indicator when required', () => {
    render(<Input label="Username" required />);
    const label = screen.getByText('Username');
    expect(label.parentElement).toHaveTextContent('*');
  });

  it('associates label with input using htmlFor', () => {
    render(<Input label="Username" id="username" />);
    const label = screen.getByText('Username');
    expect(label).toHaveAttribute('for', 'username');
  });

  // Helper text tests
  it('displays helper text when provided', () => {
    render(<Input helperText="Enter your username" />);
    expect(screen.getByText('Enter your username')).toBeInTheDocument();
  });

  it('displays error message when error is true', () => {
    render(<Input error errorMessage="Username is required" />);
    expect(screen.getByText('Username is required')).toBeInTheDocument();
    expect(screen.getByText('Username is required')).toHaveClass('text-red-500');
  });

  // Icon tests
  it('renders prefix icon when provided', () => {
    render(<Input prefixIcon={<span data-testid="prefix-icon" />} />);
    expect(screen.getByTestId('prefix-icon')).toBeInTheDocument();
  });

  it('renders suffix icon when provided', () => {
    render(<Input suffixIcon={<span data-testid="suffix-icon" />} />);
    expect(screen.getByTestId('suffix-icon')).toBeInTheDocument();
  });

  // Password visibility toggle tests
  it('toggles password visibility when showPasswordToggle is true', () => {
    render(<Input type="password" showPasswordToggle />);
    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input).toHaveAttribute('type', 'password');

    const toggleButton = screen.getByRole('button');
    fireEvent.click(toggleButton);
    expect(input).toHaveAttribute('type', 'text');

    fireEvent.click(toggleButton);
    expect(input).toHaveAttribute('type', 'password');
  });

  // Number controls tests
  it('increments and decrements value with number controls', () => {
    const onChange = jest.fn();
    render(<Input type="number" showNumberControls value="5" onChange={onChange} />);
    
    const incrementButton = screen.getByLabelText('Increment');
    const decrementButton = screen.getByLabelText('Decrement');
    
    fireEvent.click(incrementButton);
    expect(onChange).toHaveBeenCalledWith(expect.objectContaining({ target: { value: '6' } }));
    
    fireEvent.click(decrementButton);
    expect(onChange).toHaveBeenCalledWith(expect.objectContaining({ target: { value: '4' } }));
  });

  // Interaction tests
  it('calls onChange when input value changes', () => {
    const handleChange = jest.fn();
    render(<Input onChange={handleChange} />);
    const input = screen.getByRole('textbox');
    
    fireEvent.change(input, { target: { value: 'test' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('disables the input when disabled is true', () => {
    render(<Input disabled />);
    const input = screen.getByRole('textbox');
    expect(input).toBeDisabled();
  });

  // Accessibility tests
  it('adds correct aria attributes for accessibility', () => {
    render(<Input error errorMessage="Invalid input" id="test-input" />);
    const input = screen.getByRole('textbox');
    
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAttribute('aria-describedby', 'test-input-description');
    
    const errorMessage = screen.getByText('Invalid input');
    expect(errorMessage).toHaveAttribute('id', 'test-input-description');
  });

  it('sets input as read-only when readOnly is true', () => {
    render(<Input readOnly />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('readonly');
  });

  // Full width test
  it('applies full width class when fullWidth is true', () => {
    render(<Input fullWidth data-testid="input" />);
    const container = screen.getByTestId('input').parentElement?.parentElement;
    expect(container).toHaveClass('w-full');
  });
});
