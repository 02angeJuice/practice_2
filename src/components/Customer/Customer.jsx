import React from 'react'
import CustomerForm from './CustomerForm'
import CustomerList from './CustomerList'

const Customer = () => {
  return (
    <>
      <div className="sm:w-5/5 md:w-5/5 lg:w-5/5 xl:w-4/5 m-auto mt-10 p-2">
        <CustomerForm />
        <CustomerList />
      </div>
    </>
  )
}

export default Customer
