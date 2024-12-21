
import { Bar, BarChart, XAxis, YAxis, CartesianGrid} from "recharts"

import { ChartContainer, ChartTooltip } from "@/components/ui/chart"

const data = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 300 },
  { name: "Mar", value: 500 },
  { name: "Apr", value: 200 },
  { name: "May", value: 450 },
]
const Barchart = () => {
    return (
        <div className="">
            
        <ChartContainer
          config={{
            value: {
              label: "Sales",
              color: "white",
            },
          }}
          className="h-28 w-60 mx-auto"
        >
          <BarChart data={data}>
            <XAxis stroke="white" dataKey="name" />
            <YAxis stroke="white" />
            <CartesianGrid strokeDasharray="3 3" />
            <ChartTooltip contentStyle={{ color: 'white', backgroundColor: 'gray' }} />
            <Bar dataKey="value" fill="white" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ChartContainer>
     
        </div>
    );
};

export default Barchart;