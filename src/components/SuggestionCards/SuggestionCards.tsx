import { ArrowUpRight, ArrowDownRight } from 'lucide-react'

interface ChartCardProps {
    icon?: React.ReactNode
    title: string
    value: string | number
   
    color?: 'green' | 'red' | 'yellow'
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

export default function SuggestionsCard({
    icon,
    title,
    value,
 
    color = 'green',
    chartWidth = 120,
    chartHeight = 60,
}: ChartCardProps) {
  
    const { text, bg, stroke, fillFrom, cardTo } = colorMap[color] || colorMap.green

    return (
        <div
            className="flex items-center justify-between rounded-2xl bg-gradient-to-br px-4 py-4  h-content  shadow-sm w-full max-w-md"
            style={{
                backgroundImage: `radial-gradient(circle at bottom right, ${cardTo}, white 70%)`,

            }}>      {/* Left Section */}
            <div className="flex flex-col gap-8">
                {/* Icon + Title */}
                <div className="flex items-center gap-2">
                    <div
                        className="w-10 h-10 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: bg }}
                    >
                        {icon}
                    </div>
                    <span className="text-sm font-medium text-gray-500">{title}</span>
                </div>

                {/* Value */}
                <div className="text-2xl font-semibold text-gray-900 flex items-center ">
                    {title === "Potential Savings" && (
                        <svg width="24" height="24" viewBox="0 0 14 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.112 21.288C5.992 21.288 4.952 21.08 3.992 20.664C3.032 20.232 2.216 19.648 1.544 18.912C0.872 18.176 0.376 17.328 0.0560001 16.368L2.456 15.36C2.888 16.464 3.52 17.312 4.352 17.904C5.184 18.496 6.144 18.792 7.232 18.792C7.872 18.792 8.432 18.696 8.912 18.504C9.392 18.296 9.76 18.008 10.016 17.64C10.288 17.272 10.424 16.848 10.424 16.368C10.424 15.712 10.24 15.192 9.872 14.808C9.504 14.424 8.96 14.12 8.24 13.896L4.88 12.84C3.536 12.424 2.512 11.792 1.808 10.944C1.104 10.08 0.752 9.072 0.752 7.92C0.752 6.912 1 6.032 1.496 5.28C1.992 4.512 2.672 3.912 3.536 3.48C4.416 3.048 5.416 2.832 6.536 2.832C7.608 2.832 8.584 3.024 9.464 3.408C10.344 3.776 11.096 4.288 11.72 4.944C12.36 5.6 12.824 6.36 13.112 7.224L10.76 8.256C10.408 7.312 9.856 6.584 9.104 6.072C8.368 5.56 7.512 5.304 6.536 5.304C5.944 5.304 5.424 5.408 4.976 5.616C4.528 5.808 4.176 6.096 3.92 6.48C3.68 6.848 3.56 7.28 3.56 7.776C3.56 8.352 3.744 8.864 4.112 9.312C4.48 9.76 5.04 10.096 5.792 10.32L8.912 11.304C10.336 11.736 11.408 12.36 12.128 13.176C12.848 13.976 13.208 14.976 13.208 16.176C13.208 17.168 12.944 18.048 12.416 18.816C11.904 19.584 11.192 20.192 10.28 20.64C9.368 21.072 8.312 21.288 7.112 21.288ZM6.008 23.4V0.719999H7.928V23.4H6.008Z" fill="#24282E"/>
                      </svg>
                      
                    )}
                    {value}
                </div>
             
            
              
            </div>

            {/* Chart */}
        
        </div>
    )
}
