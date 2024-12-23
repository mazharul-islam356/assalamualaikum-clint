
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useMonthlyCostData = () => {
    const axiosSecure = useAxiosSecure()
    
    const {data: monthlyCoastData = [], refetch } =useQuery({
        queryKey : ['monthlyCoastData'] ,
        queryFn : async ()=>{
            const res= await axiosSecure.get('monthlyCost')
            return res.data
        }
    })
    return [monthlyCoastData , refetch ]
   
};

export default useMonthlyCostData;

