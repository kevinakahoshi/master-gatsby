import React from 'react';
import PatchEvent, { set, unset } from 'part:@sanity/form-builder/patch-event';

const createPatchFrom = (value) =>
  PatchEvent.from(value === '' ? unset() : set(Number(value)));

const formatMoney = Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
}).format;

const labelWrapper = {
  marginBottom: '0.5rem',
  padding: '0.25rem 0',
};

const labelStyles = {
  fontSize: '0.8125rem',
  lineHeight: '1.23077',
  fontWeight: '600',
  color: '#262f3d',
  margin: 0,
};

const labelDescription = {
  color: '#66758d',
  fontSize: '0.8125rem',
  lineHeight: '1.23077',
  margin: '0',
};

const inputStyles = {
  appearance: 'none',
  border: '1px solid #cad1dc',
  display: 'block',
  width: '100%',
  outline: 'none',
  font: 'inherit',
  lineHeight: '1.25',
  boxSizing: 'border-box',
  padding: 'calc(0.75rem - 3px) calc(0.75rem - 1px) calc(0.75rem - 2px)',
  borderRadius: '2px',
  color: '#262f3d',
  backgroundColor: '#fff',
  boxShadow: 'none',
};

const PriceInput = ({ type, value, onChange, inputComponent }) => (
  <div>
    <div style={labelWrapper}>
      <p style={labelStyles}>
        {type.title}
        {value && ` - ${formatMoney(value / 100)}`}
      </p>
      <p style={labelDescription}>{type.description}</p>
    </div>
    <input
      style={inputStyles}
      type={type.name}
      value={value}
      onChange={(event) => onChange(createPatchFrom(event.target.value))}
      ref={inputComponent}
    />
  </div>
);

PriceInput.focus = () => this._inputElement.focus();

export default PriceInput;
