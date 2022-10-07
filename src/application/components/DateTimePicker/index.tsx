import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker as MUIDateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import moment from "moment";
import "moment/locale/pt-br";
import { useEffect, useState } from "react";
import { TextField } from "@mui/material";

interface DateTimePicker {
  label: string;
  onChange: Function;
}
export default function DateTimePicker(params: DateTimePicker) {
  const dateNow = moment();
  const [value, setValue] = useState<moment.Moment | null>(dateNow);
  useEffect(() => {
    params.onChange(dateNow.toDate().toISOString());
  }, []);

  const handleOnChange = (momentInstance: moment.Moment | null) => {
    setValue(momentInstance);
    if (momentInstance != null)
      params.onChange(momentInstance.toDate().toISOString());
  };

  return (
    <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="pt-br">
      <MUIDateTimePicker
        label={params.label}
        value={value}
        onChange={(e) => handleOnChange(e)}
        renderInput={(params) => <TextField {...params} variant="standard" />}
      />
    </LocalizationProvider>
  );
}
