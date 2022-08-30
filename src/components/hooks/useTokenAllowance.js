import { useEffect } from "react"
import { useMemo } from "react"
import { useTokenContract } from "./useContract"


const useTokenAllowance = async (token, account, spender) => {
    const contract = useTokenContract(token)
    console.log('contract', contract)
    console.log('account', account)
    useMemo(() => {
        const getAllownace = async () => {
            
            if (!contract || !account) return null
            const allowance = await contract.allowance(account, spender)
            console.log('allowance', allowance)
        }
        getAllownace()
    }, [token, account , spender])
    
}

export default useTokenAllowance