
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useMonthlyCostData = () => {
    const axiosSecure = useAxiosSecure()
    
    const {data: monthlyCoast = [], refetch } =useQuery({
        queryKey : ['monthlyCoast'] ,
        queryFn : async ()=>{
            const res= await axiosSecure.get('monthlyCost')
            return res.data
        }
    })
    return [monthlyCoast , refetch ]
   
};

export default useMonthlyCostData;

