import Image from "next/image"

const logo = () => {
  return (
    <Image height={130} width={130} alt="logo" src="/logo.svg" />
  )
}

export default logo