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

const DEFAULT_PROPS: Props<SheetData> = {
  spreadsheetId: process.env.NEXT_PUBLIC_SPREADSHEET_ID!,
  sheetName: process.env.NEXT_PUBLIC_SHEET_NAME!,
  apiKey: process.env.NEXT_PUBLIC_API_KEY!,
  range: { start: "B2", end: "C3" },
  names: ["blueName", "blueFlavourText", "orangeName", "orangeFlavourText"],
};

const useProps = (): Props<SheetData> => {
  const router = useRouter();
  const { key } = router.query as { key: string | undefined };
  return { ...DEFAULT_PROPS, apiKey: key || DEFAULT_PROPS.apiKey };
};

interface SheetsResponse {
  range: string;
  majorDimension: "COLUMNS" | "ROWS";
  values: string[][];
}

export const useData = () => {
  const props = useProps();

  const { data, error } = useSWR<SheetsResponse>(getUrl(props), fetcher, {
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
