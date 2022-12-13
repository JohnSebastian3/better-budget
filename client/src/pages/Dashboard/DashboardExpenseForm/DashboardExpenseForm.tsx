import axios from 'axios';
import React, {useForm} from 'react-hook-form'
import Button from '../../../components/UI/Button/Button';

const DashboardExpenseForm = () => {

  const {register, handleSubmit, reset} = useForm()

  const onSubmit = (data: any) => {
    axios
    .post(
      "http://localhost:4000/dashboard/addExpense",
      { 
        title: data.title,
        category: data.category,
        value: Number(data.value),
      },
      {
        withCredentials: true,
      }
    )
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      console.log(err);
    });
  }

  return (
    <form action='dashboard/addExpense' method='POST' onSubmit={handleSubmit(onSubmit)}>
      <input type='text' placeholder='what did  you sepnd it pn' {...register('title')}></input>
      <input type="text" placeholder='category?' {...register('category')}/>
      <input type="number" placeholder='amount spent?' {...register('value')}/>
      <Button type='submit' value='Add Expense' kind='btn-primary-green'></Button>
    </form>
  )
}

export default DashboardExpenseForm;