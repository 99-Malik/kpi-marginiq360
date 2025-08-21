import CustomLineChart from "./CustomLineChart";

interface ChartCardProps {
  icon?: React.ReactNode;
  title: string;
  value: string | number;
  change?: string; // now optional
  amount?: string; // e.g. "+$500"
  color?: "green" | "red" | "yellow" | "purple" | "purpleDeep";
  chartData?: { value: number; name: string }[];
  chartWidth?: number;
  chartHeight?: number;
  showChart?: boolean;
}

const colorMap = {
  green: {
    text: "#009499",
    bg: "#E6F4F5",
    stroke: "#009499",
    fillFrom: "#009499",
    cardTo: "#f2fdfd",
  },
  red: {
    text: "#DC2626",
    bg: "#FEE2E2",
    stroke: "#ef4444",
    fillFrom: "#ef4444",
    cardTo: "#fff4f4",
  },
  yellow: {
    text: "#E7AA0B",
    bg: "#FFF3D1",
    stroke: "#E7AA0B",
    fillFrom: "#E7AA0B",
    cardTo: "#fffaf2",
  },
  purple: {
    text: "#E44FBA",
    bg: "#FCEDF8",
    stroke: "#E44FBA",
    fillFrom: "#E44FBA",
    cardTo: "#fdf2fd",
  },
  purpleDeep: {
    text: "#6E0AB8",
    bg: "#F2E8FF",
    stroke: "#6E0AB8",
    fillFrom: "#E8D2FF",
    cardTo: "#faf5ff",
  },
};

export default function ChartCard({
  icon,
  title,
  value,
  change, // optional
  amount,
  color = "green",
  chartData,
  chartWidth = 120,
  chartHeight = 60,
  showChart = false,
}: ChartCardProps) {
  const valuesOnly = chartData ? chartData.map((item) => item.value) : [];
  const { text, bg, stroke, fillFrom, cardTo } = colorMap[color] || colorMap.green;

  const hasAmount = typeof amount === "string" && amount.trim().length > 0;
  const hasChange = typeof change === "string" && change.trim().length > 0;
  const isNegative = hasChange ? change!.trim().startsWith("-") : false;

  return (
    <div
      className="flex flex-col rounded-2xl bg-gradient-to-br p-4 h-auto shadow-sm w-full max-w-md"
      style={{
        backgroundImage: `radial-gradient(circle at bottom right, ${cardTo}, white 70%)`,
      }}
    >
      {/* Title */}
      <div className="flex items-center gap-2 mb-1">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center"
          style={{ backgroundColor: bg }}
        >
          {icon}
        </div>
        <span className="text-sm font-medium text-gray-500">{title}</span>
      </div>

      {/* Value + Chart */}
      <div className="flex items-start justify-between mt-3">
        <div className="text-2xl font-semibold text-gray-900 flex-shrink-0 flex items-center gap-0">
          {/* Dollar sign for Total Revenue and Gross Profit */}
          {(title === "Total Revenue" || title === "Gross Profit" || title === "Total Budget" || title === "Budget Accuracy" || title === "Variance") && (
            <svg
              width="24"
              height="24"
              viewBox="0 0 14 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden
            >
              <path d="M7.112 21.288C5.992 21.288 4.952 21.08 3.992 20.664C3.032 20.232 2.216 19.648 1.544 18.912C0.872 18.176 0.376 17.328 0.0560001 16.368L2.456 15.36C2.888 16.464 3.52 17.312 4.352 17.904C5.184 18.496 6.144 18.792 7.232 18.792C7.872 18.792 8.432 18.696 8.912 18.504C9.392 18.296 9.76 18.008 10.016 17.64C10.288 17.272 10.424 16.848 10.424 16.368C10.424 15.712 10.24 15.192 9.872 14.808C9.504 14.424 8.96 14.12 8.24 13.896L4.88 12.84C3.536 12.424 2.512 11.792 1.808 10.944C1.104 10.08 0.752 9.072 0.752 7.92C0.752 6.912 1 6.032 1.496 5.28C1.992 4.512 2.672 3.912 3.536 3.48C4.416 3.048 5.416 2.832 6.536 2.832C7.608 2.832 8.584 3.024 9.464 3.408C10.344 3.776 11.096 4.288 11.72 4.944C12.36 5.6 12.824 6.36 13.112 7.224L10.76 8.256C10.408 7.312 9.856 6.584 9.104 6.072C8.368 5.56 7.512 5.304 6.536 5.304C5.944 5.304 5.424 5.408 4.976 5.616C4.528 5.808 4.176 6.096 3.92 6.48C3.68 6.848 3.56 7.28 3.56 7.776C3.56 8.352 3.744 8.864 4.112 9.312C4.48 9.76 5.04 10.096 5.792 10.32L8.912 11.304C10.336 11.736 11.408 12.36 12.128 13.176C12.848 13.976 13.208 14.976 13.208 16.176C13.208 17.168 12.944 18.048 12.416 18.816C11.904 19.584 11.192 20.192 10.28 20.64C9.368 21.072 8.312 21.288 7.112 21.288ZM6.008 23.4V0.719999H7.928V23.4H6.008Z" fill="#24282E" />
            </svg>
          )}
          {value}
          {/* Percentage sign for Avg Margin or COGS % */}
          {(title === "Avg Margin" || title === "COGS %") && (
            <span className="text-2xl font-semibold text-gray-900">%</span>
          )}
        </div>

        <div className="w-[120px] h-[50px] flex-shrink-0 overflow-hidden">
          {showChart && (
            <CustomLineChart
              data={valuesOnly}
              width={chartWidth}
              height={chartHeight}
              strokeColor={stroke}
              fillGradientFrom={fillFrom}
              fillGradientTo="#ffffff"
            />
          )}
        </div>
      </div>

      {/* Change + Amount row */}
      {title !== "Actual Spent" && (
        <div
        className="text-sm font-medium flex items-center gap-1 mt-1"
        style={{ color: text }}
      >
        {/* show change + arrow only if change is provided */}
        {hasChange && (
          <>
            <span>{change}</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden
            >
              <path
                d="M4.27325 10.6667H11.7266C11.8584 10.6661 11.9872 10.6265 12.0965 10.5528C12.2058 10.4791 12.2908 10.3746 12.3408 10.2526C12.3907 10.1306 12.4034 9.99648 12.3771 9.86727C12.3508 9.73806 12.2869 9.61954 12.1932 9.52669L8.47325 5.8067C8.41127 5.74421 8.33754 5.69461 8.2563 5.66077C8.17506 5.62692 8.08792 5.6095 7.99991 5.6095C7.91191 5.6095 7.82477 5.62692 7.74353 5.66077C7.66229 5.69461 7.58856 5.74421 7.52658 5.8067L3.80658 9.52669C3.71297 9.61954 3.64898 9.73806 3.62273 9.86727C3.59647 9.99648 3.60912 10.1306 3.65907 10.2526C3.70902 10.3746 3.79403 10.4791 3.90335 10.5528C4.01267 10.6265 4.1414 10.6661 4.27325 10.6667Z"
                fill={text}
              />
            </svg>
          </>
        )}

        {/* amount (or placeholder) always rendered */}
        {hasAmount ? (
          <span className="text-gray-500 font-normal">{amount}</span>
        ) : (
          <svg
            width="12"
            height="2"
            viewBox="0 0 12 2"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
          >
            <path
              d="M0.036 1.738V0.758H4.936V1.738H0.036ZM7.07866 1.738V0.758H11.9787V1.738H7.07866Z"
              fill="#727A90"
            />
          </svg>
        )}
        </div>
      )}
    </div>
  );
}
