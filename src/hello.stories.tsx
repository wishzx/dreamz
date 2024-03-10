import { Box, Input, InputProps, Typography } from "@mui/joy";
import React from "react";

import { useQuery } from "react-query";

type DebounceProps = {
  handleDebounce: (value: string) => void;
  debounceTimeout: number;
};

function DebounceInput(props: InputProps & DebounceProps) {
  const { handleDebounce, debounceTimeout, ...rest } = props;

  const timerRef = React.useRef<ReturnType<typeof setTimeout>>();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      handleDebounce(event.target.value);
    }, debounceTimeout);
  };

  return <Input {...rest} onChange={handleChange} />;
}

export function DebouncedInput() {
  const [debouncedValue, setDebouncedValue] = React.useState("");
  const handleDebounce = (value: string) => {
    setDebouncedValue(value);
  };
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      <DebounceInput
        placeholder='Type in here…'
        debounceTimeout={1000}
        handleDebounce={handleDebounce}
      />
      <Typography>Debounced input: {debouncedValue}</Typography>
    </Box>
  );
}

export function Imdb() {
  const result = useQuery("imdb", async () => {
    return fetch(
      "https://v3.sg.media-imdb.com/suggestion/x/barbie.json?includeVideos=0",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    ).then((response) => response.json());
  });
  console.log(result);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      <Typography>Imdb</Typography>
      {result.isLoading && <Typography>Loading…</Typography>}
      {result.isSuccess && (
        <Typography>{JSON.stringify(result.data, null, 2)}</Typography>
      )}
    </Box>
  );
}

export function Youtube() {
  const result = useQuery("youtube", async () => {
    return fetch(
      "https://www.youtube.com/youtubei/v1/search?prettyPrint=false&key=AIzaSyD-8g0dZzv7z3G9Cg3vzr3",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    ).then((response) => response.json());
  });
  console.log(result);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      <Typography>Youtube</Typography>
      {result.isLoading && <Typography>Loading…</Typography>}
      {result.isSuccess && (
        <Typography>{JSON.stringify(result.data, null, 2)}</Typography>
      )}
    </Box>
  );
}

export function Goodreads() {
  //
  const result = useQuery("goodreads", async () => {
    return fetch(
      "https://www.googleapis.com/books/v1/volumes?q=harry+potter",
      //"https://www.goodreads.com/book/auto_complete?format=json&q=the+song+of+achilles",
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    ).then((response) => response.json());
  });
  console.log(result);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      <Typography>Goodreads</Typography>
      {result.isLoading && <Typography>Loading…</Typography>}
      {result.isSuccess && (
        <Typography>{JSON.stringify(result.data, null, 2)}</Typography>
      )}
    </Box>
  );
}
