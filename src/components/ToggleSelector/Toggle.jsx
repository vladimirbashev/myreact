import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import {useEffect} from "react";

export default function ToggleSelector({ value, options, onChange }) {
  const selected = value ?? options[0]?.value;

  useEffect(() => {
    if (!value && options[0]) {
      onChange?.(options[0].value);
    }
  }, []);

  const handleChange = (event, newValue) => {
    if (newValue !== null) {
      onChange?.(newValue);
    }
  };

  return (
    <ToggleButtonGroup
      value={selected}
      exclusive
      onChange={handleChange}
      aria-label="header options"
      size="small"
      sx={{ ml: 2 }}
    >
      {options.map((opt) => (
        <ToggleButton key={opt.value} value={opt.value} aria-label={opt.label}>
          {opt.label}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}
