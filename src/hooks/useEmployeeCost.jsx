


import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useEmployeeCost = () => {
    const axiosSecure = useAxiosSecure()
    
    const {data: employeeCostDataa = [], refetch } =useQuery({
        queryKey : ['employeeCostDataa'] ,
        queryFn : async ()=>{
            const res= await axiosSecure.get('/employee-cost')
            return res.data
        }
    })
    return [employeeCostDataa , refetch ]
   
};

export default useEmployeeCost;

