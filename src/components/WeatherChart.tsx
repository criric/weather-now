import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts';

export function WeatherChart({data, locale}: {data: any, locale: string}) {
    return (
      <ResponsiveContainer width="100%" aspect={5}>
        <AreaChart
          data={data[0]['hour']}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <XAxis dataKey="time" tick={{fontSize: 10}} tickFormatter={(date) => new Date(date).toLocaleTimeString('en-US')}/>
          <Tooltip />
          <Area type="monotone" dataKey={locale === 'world' ? "temp_c" : "temp_f"} stroke="##C47F17" fill="#DBAC2C" />
        </AreaChart>
      </ResponsiveContainer>
    );
  }
