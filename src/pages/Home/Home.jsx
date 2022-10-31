
import { useEffect, useState } from 'react';

import axios from 'axios';
import './styles.css';
import { useForm } from 'react-hook-form';


const Home = () => {
  const [ufs, setUfs] = useState([])
  const [city, setCity] = useState([])
  const [passenger, setPassenger] = useState([])

  const { register, handleSubmit, formState: { errors } } = useForm({});

  useEffect(() => {
    const getDataUfs = async () => {
      const res = await axios.get('https://amazon-api.sellead.com/country')

      setUfs(res.data)

    }
    getDataUfs()
  }, [ufs])


  useEffect(() => {
    const getDataCity = async () => {
      const res = await axios.get('https://amazon-api.sellead.com/city')

      setCity(res.data)

    }
    getDataCity()
  }, [city])

  const onSubmit = (data) => {

    const dataForm = data
     
    setPassenger(dataForm)
  
  }


  return (
    <>
      <div className="container">
        <h1>
          Choose your Destiny
          <i className='bx bxs-plane-take-off'></i>
        </h1>
        <form className='content-form' onSubmit={handleSubmit(onSubmit)} >
          <div className='form-area'>
            <div className='label-area'>
              <h3>Register your Data</h3>
              <div className='label-input'>
                <label htmlFor="name">Name:</label>
                <div className='input'>
                  <i className='bx bxs-user'></i>
                  <input name='name' type='text'
                    className="form-control"
                     placeholder="Name..."
                    {...register("name", { required: true })}
                  />
                </div>
              </div>
              {errors.name?.type === 'required' && <span className='error'>O campo é obrigatorio</span>}

              <div className='label-input'>
                <label htmlFor="email">Email:</label>
                <div className='input'>
                  <i className='bx bxs-envelope'></i>
                  <input name='email' type="text"
                    className="form-control"
                    placeholder="Email..."
                    {...register("email", { required: true })}
                  />
                </div>
              </div>
              {errors.email?.type === 'required' && <span className='error'>Coloque um email valido</span>}

              <div className='label-input'>
                <label htmlFor="phone">Phone:</label>
                <div className='input'>
                  <i className='bx bx-phone'></i>
                  <input name='phone' type='text'
                    className="form-control"
                     placeholder="Phone Number..."
                    {...register("phone", { required: true })}
                  />

                </div>
              </div>
              {errors.phone?.type === 'required' && <span className='error'>O campo é obrigatorio</span>}

              <div className='label-input'>
                <label htmlFor="cpf">CPF:</label>
                <div className='input'>
                  <i className='bx bxs-id-card'></i>
                  <input name='cpf' type="text"
                    className="form-control"
                     placeholder="CPF Number..."
                    {...register("cpf", { required: true })}
                  />
                </div>
              </div>
              {errors.cpf?.type === 'required' && <span className='error'>O campo é obrigatorio</span>}
            </div>
            <div className="select-destiny">
              <h3>
                Select your Destiny
              </h3>
              <select id="country" {...register("country", { required: true })} >

                <option className='opt' value="0">
                  Select your country destiny

                </option>
                {
                  ufs.map(uf => (
                    <option key={uf.code}>{uf.name_ptbr}</option>
                  ))
                }
              </select>

              <select id="city" {...register("city", { required: true })} >
                <option className='opt' value="0">
                  Select your city destiny

                </option>
                {
                  city.map(city => (
                    <option key={city.id}>{city.name_ptbr}</option>
                  ))
                }
              </select>


              <button className='btn' type='submit' >
                Send
                <i className='bx bxs-plane-take-off'></i>
              </button>
            </div>
          </div>
        </form >
      </div>
    </>
  )
}

export default Home;
