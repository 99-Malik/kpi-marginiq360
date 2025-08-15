import CustomLineChart from './CustomLineChart'
import { ArrowUpRight, ArrowDownRight } from 'lucide-react'

interface ChartCardProps {
    icon?: React.ReactNode
    title: string
    value: string | number
    change: string // e.g. "+10%" or "-5%"
    amount: string // e.g. "+$500"
    color?: 'green' | 'red' | 'yellow'
    chartData: { value: number; name: string }[]
    chartWidth?: number
    chartHeight?: number
}

const colorMap = {
    green: {
        text: '#009499',
        bg: '#E6F4F5',
        stroke: '#009499',
        fillFrom: '#009499',
        cardTo: '#f2fdfd',
    },
    red: {
        text: '#DC2626',
        bg: '#FEE2E2',
        stroke: '#ef4444',
        fillFrom: '#ef4444',
        cardTo: '#fff4f4',
    },
    yellow: {
        text: '#E7AA0B',
        bg: '#FFF3D1',
        stroke: '#E7AA0B',
        fillFrom: '#E7AA0B',
        cardTo: '#fffaf2',
    },
}

export default function ChartCard({
    icon,
    title,
    value,
    change,
    amount,
    color = 'green',
    chartData,
    chartWidth = 120,
    chartHeight = 60,
}: ChartCardProps) {
    const valuesOnly = chartData.map((item) => item.value)
    const isNegative = change.startsWith('-')
    const { text, bg, stroke, fillFrom, cardTo } = colorMap[color] || colorMap.green

    return (
        <div
            className="flex items-center justify-between rounded-2xl bg-gradient-to-br pl-4 pt-4 h-[168px]  shadow-sm w-full max-w-md"
            style={{
                backgroundImage: `radial-gradient(circle at bottom right, ${cardTo}, white 70%)`,

            }}>      {/* Left Section */}
            <div className="flex flex-col gap-2">
                {/* Icon + Title */}
                <div className="flex items-center gap-2">
                    <div
                        className="w-8 h-8 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: bg }}
                    >
                        {icon}
                    </div>
                    <span className="text-sm font-medium text-gray-500">{title}</span>
                </div>

                {/* Value */}
                <div className="text-2xl font-semibold text-gray-900">{value}</div>

                {/* Change */}
                <div className="text-sm font-medium flex items-center gap-1" style={{ color: text }}>
                    {change}
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M4.27325 10.6667H11.7266C11.8584 10.6661 11.9872 10.6265 12.0965 10.5528C12.2058 10.4791 12.2908 10.3746 12.3408 10.2526C12.3907 10.1306 12.4034 9.99648 12.3771 9.86727C12.3508 9.73806 12.2869 9.61954 12.1932 9.52669L8.47325 5.8067C8.41127 5.74421 8.33754 5.69461 8.2563 5.66077C8.17506 5.62692 8.08792 5.6095 7.99991 5.6095C7.91191 5.6095 7.82477 5.62692 7.74353 5.66077C7.66229 5.69461 7.58856 5.74421 7.52658 5.8067L3.80658 9.52669C3.71297 9.61954 3.64898 9.73806 3.62273 9.86727C3.59647 9.99648 3.60912 10.1306 3.65907 10.2526C3.70902 10.3746 3.79403 10.4791 3.90335 10.5528C4.01267 10.6265 4.1414 10.6661 4.27325 10.6667Z"
                            fill={text}
                        />
                    </svg>
                    <span className="text-gray-500 font-normal">{amount}</span>
                </div>
            </div>

            {/* Chart */}
            <div className="w-[140px] h-[70px]">
                <CustomLineChart
                    data={valuesOnly}
                    width={chartWidth}
                    height={chartHeight}
                    strokeColor={stroke}
                    fillGradientFrom={fillFrom}
                    fillGradientTo="#ffffff"
                />
            </div>
        </div>
    )
}
