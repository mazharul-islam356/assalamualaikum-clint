
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useEmployeeSalary = () => {
    const axiosSecure = useAxiosSecure()
    
    const {data: salaryCoastData = [], refetch } =useQuery({
        queryKey : ['salaryCoastData'] ,
        queryFn : async ()=>{
            const res= await axiosSecure.get('salary')
            return res.data
        }
    })
    return [salaryCoastData , refetch ]
   
};

export default useEmployeeSalary;

