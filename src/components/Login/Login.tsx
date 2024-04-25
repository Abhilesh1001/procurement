import PrBurron from '@/components/button/PrBurron'
import Button from '../button'



import { useState } from 'react'
import { useRouter } from 'next/navigation';
import { getMainheader } from '@/redux/slice'
import { useDispatch } from 'react-redux'
import ButtonSave from '../button/ButtonSave';
import { soundClick } from '@/sound/sound';

const Login = () => {
  const [signup,setSignup] = useState('sign')
  const dispatch = useDispatch()
  const router = useRouter()
  const handleSignup =() =>{
    soundClick?.play()
    dispatch(getMainheader('Signup Form'))
    router.push('/signup')
  }

  return (
    <div className='container flex justify-center'>
    <div className='mt-10  border-gray-500'>
        {signup !=='' && <Button />}
        <button  type='button' className='btn btn-secondary' onClick={handleSignup}>Signup Form</button>
    </div>
</div>
  )
}

export default Login