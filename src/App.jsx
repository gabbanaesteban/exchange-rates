import React, { useState } from "react"
import { Flex, Heading, Box, Center } from "@chakra-ui/layout"
import {
  Editable,
  EditableInput,
  EditablePreview,
  Select,
  Text,
  Link,
} from "@chakra-ui/react"
import Rates from "./Rates"

function App() {
  const currencies = ["USD", "EUR", "DOP", "BRL", "PEN", "ARS"]
  const [currency, setCurrency] = useState("USD")
  const [token, setToken] = useState(undefined)

  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
      <Box boxShadow="xl" p="6" rounded="md">
        <Center>
          <Heading mb="3" alignItems="center">
            Exchange Rates
          </Heading>
        </Center>
        <Editable
          mb="3"
          textAlign="center"
          defaultValue="Click to enter your API key"
          onSubmit={(value) => setToken(value)}
        >
          <EditablePreview />
          <EditableInput />
        </Editable>
        <Select
          mb="3"
          textAlign="center"
          defaultValue={currency}
          onChange={(e) => setCurrency(e.target.value)}
        >
          {currencies.map((currency) => {
            return (
              <option key={currency} value={currency}>
                {currency}
              </option>
            )
          })}
        </Select>
        <Rates
          currencies={currencies}
          selectedCurrency={currency}
          token={token}
        />
        <Center>
          <Text fontSize="xs">
            <Link color="teal.500" href="https://www.exchangerate-api.com/">
              Get your free API key here!
            </Link>
          </Text>
        </Center>
      </Box>
    </Flex>
  )
}

export default App
