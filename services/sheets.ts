import { useRouter } from "next/router";
import useSWR from "swr";

interface Range {
  start: string;
  end: string;
}

interface Props<T> {
  spreadsheetId: string;
  sheetName: string;
  apiKey: string;
  range: Range;
  names: (keyof T)[];
}

const fetcher = (...args: Parameters<typeof fetch>) =>
  fetch(...args).then((res) => res.json());

interface SheetData {
  blueName: string;
  blueFlavourText: string;
  orangeName: string;
  orangeFlavourText: string;
}

const DEFAULT_QUERY_PARAM_PROPS: Partial<
  Pick<Props<SheetData>, "spreadsheetId" | "sheetName" | "apiKey">
> = {
  spreadsheetId: process.env.NEXT_PUBLIC_SPREADSHEET_ID,
  sheetName: process.env.NEXT_PUBLIC_SHEET_NAME,
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
};

const DEFAULT_PROPS: Pick<Props<SheetData>, "range" | "names"> = {
  range: { start: "B2", end: "C3" },
  names: ["blueName", "blueFlavourText", "orangeName", "orangeFlavourText"],
};

const useProps = () => {
  const router = useRouter();
  const { spreadsheetId, sheetName, key } = router.query as {
    spreadsheetId: string | undefined;
    sheetName: string | undefined;
    key: string | undefined;
  };
  return {
    ...DEFAULT_PROPS,
    spreadsheetId: spreadsheetId || DEFAULT_QUERY_PARAM_PROPS.spreadsheetId,
    sheetName: sheetName || DEFAULT_QUERY_PARAM_PROPS.sheetName,
    apiKey: key || DEFAULT_QUERY_PARAM_PROPS.apiKey,
  };
};

interface SheetsResponse {
  range: string;
  majorDimension: "COLUMNS" | "ROWS";
  values: string[][];
}

export const useData = () => {
  const props = useProps();
  const url =
    props.spreadsheetId !== undefined && props.sheetName && props.apiKey
      ? getUrl(props as Omit<Props<SheetData>, "names">)
      : null;

  const { data, error } = useSWR<SheetsResponse>(url, fetcher, {
    refreshInterval: 3000,
  });
  const parsedData: Partial<SheetData> = {};
  data?.values?.flat().forEach((value, i) => {
    parsedData[props.names[i]] = value;
  });

  return {
    data: parsedData,
    isLoading: !error && !data,
    isError: error,
  };
};

const getUrl = <T>({
  spreadsheetId,
  sheetName,
  apiKey,
  range,
}: Omit<Props<T>, "names">) => {
  return `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${sheetName}!${range.start}:${range.end}?key=${apiKey}&majorDimension=COLUMNS&valueRenderOption=FORMATTED_VALUE`;
};
