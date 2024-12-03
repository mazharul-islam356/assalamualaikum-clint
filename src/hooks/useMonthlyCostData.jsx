
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useMonthlyCostData = () => {
    const axiosSecure = useAxiosSecure()
    
    const {data, refetch } =useQuery({
        queryKey : ['monthlyCost'] ,
        queryFn : async ()=>{
            const res= await axiosSecure.get('monthlyCost')
            return res.data
        }
    })
    return [data , refetch ]
   
};

export default useMonthlyCostData;

