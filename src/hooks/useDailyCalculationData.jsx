
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useDailyCalculationData = () => {
    const axiosSecure = useAxiosSecure()
    
    const {data : dailyCalculaionData = [], refetch } =useQuery({
        queryKey : ['dailyCalculaionData'] ,
        queryFn : async ()=>{
            const res= await axiosSecure.get('dailyCalculation')
            return res.data
        }
    })
    return [dailyCalculaionData , refetch ]
   
};

export default useDailyCalculationData;