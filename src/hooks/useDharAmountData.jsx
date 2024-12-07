

import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useDharAmountData = () => {
    const axiosSecure = useAxiosSecure()
    
    const {data: DharAmounttData = [], refetch } =useQuery({
        queryKey : ['DharAmounttData'] ,
        queryFn : async ()=>{
            const res= await axiosSecure.get('/dhar_amount')
            return res.data
        }
    })
    return [DharAmounttData , refetch ]
   
};

export default useDharAmountData;

