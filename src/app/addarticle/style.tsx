import tw from 'tailwind-styled-components'

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
const Input = tw.input`
  h-[40px]
  rounded-xl
  p-[10px]
  border-2 border-stone-300/200
  w-full
`
const Area = tw.textarea`
  rounded-xl
  p-[10px]
  border-2 border-stone-300/200
  resize-none
`
const PostBtn = tw.button`
  rounded-xl
  h-[60px] w-full
  bg-indigo-500 text-white
  active: bg-indigo-600
`

export { Container, Heading, Input, Area, PostBtn }
