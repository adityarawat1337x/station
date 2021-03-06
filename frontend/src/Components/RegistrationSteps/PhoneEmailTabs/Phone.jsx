import { useState } from "react"
import LoginCard from "../../Shared/LoginCard"
import { Input, VStack, Text, Spacer } from "@chakra-ui/react"
import { sentOtp } from "../../../http"
import { useDispatch } from "react-redux"
import { setOtp } from "../../../store/authSlice"

const Phone = (props) => {
  const { next } = props
  const [phone, setPhone] = useState("")
  const dispatch = useDispatch()

  async function submit() {
    if (!phone) return
    const res = await sentOtp({ phone: phone })
    dispatch(setOtp(res.data))
    next((prev) => prev + 1)
  }

  const handleKeypress = (e) => {
    if (e.key === "Enter") {
      submit()
    }
  }

  return (
    <LoginCard
      title="📞 Enter Phone"
      data={
        <VStack>
          <Spacer />
          <Input
            autoFocus
            onChange={(e) => setPhone(e.target.value)}
            variant="filled"
            width="-moz-fit-content"
            onKeyPress={handleKeypress}
          />
          <Spacer />

          <Text fontSize="sm" colorScheme="gray">
            We will send you an otp to verify your phone.
          </Text>
          <Spacer />
        </VStack>
      }
      btnText="Next 🡪"
      btnHandler={() => {
        submit()
      }}
    />
  )
}

export default Phone
