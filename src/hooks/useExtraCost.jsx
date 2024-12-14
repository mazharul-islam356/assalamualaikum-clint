

import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useExtraCost = () => {
    const axiosSecure = useAxiosSecure()
    
    const {data: extraCoastData = [], refetch } =useQuery({
        queryKey : ['extraCoastData'] ,
        queryFn : async ()=>{
            const res= await axiosSecure.get('extraCost')
            return res.data
        }
    })
    return [extraCoastData , refetch ]
   
};

export default useExtraCost;

