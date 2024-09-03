// components/DatePicker.tsx
import React, { useEffect, useRef } from 'react';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css'; // Import Flatpickr styles

interface DatePickerProps {
  options?: flatpickr.Options.Options; // Type for Flatpickr options
  onChange?: (selectedDates: Date[], dateStr: string, instance: flatpickr.Instance) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({ options, onChange }) => {
  const datepickerRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (datepickerRef.current) {
      const fp = flatpickr(datepickerRef.current, {
        ...options,
        onChange: (selectedDates, dateStr, instance) => {
          if (onChange) {
            onChange(selectedDates, dateStr, instance);
          }
        },
      });

      // Cleanup on unmount
      return () => {
        fp.destroy();
      };
    }
  }, [options, onChange]);

  return <input ref={datepickerRef} type="text" />;
};

export default DatePicker;
