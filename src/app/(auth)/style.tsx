import tw from 'tailwind-styled-components'
import Logo from '@/assets/images/logo.png'

const Container = tw.div`
  flex
  flex-col
  gap-6
  items-center
`
const Heading = tw.h1`
  text-black
  text-4xl
  font-bold
`
const Form = tw.form`
  flex
  flex-col
  rounded-xl
  bg-stone-100
  border-2 border-stone-300/200
  gap-10
  p-[48px]
  mt-[20px]
  w-[400px]
`

const Input = tw.input`
  h-[40px]
  rounded-xl
  p-[10px]
  border-2 border-stone-300/200
`

const FormBtn = tw.button`
  rounded-xl
  h-[40px] w-full
  bg-indigo-500 text-white
  active: bg-indigo-600
`

export { Container, Heading, Form, Input, FormBtn, Logo }
