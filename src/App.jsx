import React, { useState } from "react"
import { Flex, Heading, Box, Center } from "@chakra-ui/layout"
import { Select, Text, Link, Input, Stack } from "@chakra-ui/react"
import debounce from "lodash.debounce"
import { ErrorBoundary } from "react-error-boundary"
import Rates from "./Rates"

function ErrorFallback({ error }) {
  return (
    <div role="alert">
      There was an error: <pre style={{ whiteSpace: "normal" }}>{error.message}</pre>
    </div>
  )
}

function App({ defaultToken = "ffcb4ef5345fa3d95fcf9a08" }) {
  const currencies = ["USD", "EUR", "DOP", "BRL", "PEN", "ARS"]
  const [currency, setCurrency] = useState("USD")
  const [token, setToken] = useState(defaultToken)

  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
      <Box boxShadow="xl" p="6" rounded="md">
        <Center>
          <Heading mb="3" alignItems="center">
            Exchange Rates
          </Heading>
        </Center>
        <Stack spacing={2}>
          <Input
            placeholder="API Key"
            isInvalid={!token}
            defaultValue={defaultToken}
            onChange={debounce((e) => setToken(e.target.value), 500)}
          />
          <Select mb="3" textAlign="center" defaultValue={currency} onChange={(e) => setCurrency(e.target.value)}>
            {currencies.map((currency) => {
              return (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              )
            })}
          </Select>
        </Stack>

        <Center m={3}>
          <ErrorBoundary FallbackComponent={ErrorFallback} resetKeys={[token]}>
            <Rates currencies={currencies} selectedCurrency={currency} token={token}/>
          </ErrorBoundary>
        </Center>
        <Center>
          <Text fontSize="xs">
            <Link color="teal.500" href="https://www.exchangerate-api.com/">
              Click here to get a <strong>free</strong> API key
            </Link>
          </Text>
        </Center>
      </Box>
    </Flex>
  )
}

export default App
