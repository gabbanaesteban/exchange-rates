import React, { useEffect, useState } from "react"
import { Table, Thead, Tbody, Tr, Th, Td, Spinner, Center } from "@chakra-ui/react"

function Rates({ currencies, selectedCurrency, token }) {
  const [state, setState] = useState({
    isLoading: false,
    rates: [],
    error: null,
  })

  useEffect(() => {
    if (!selectedCurrency || !token) {
      return
    }

    setState({ isLoading: true })

    getRates()
      .then((data) => {
        data.result === "success"
          ? setState({ isLoading: false, rates: composeRates(data) })
          : setState({ isLoading: false, error: new Error(data["error-type"]) })
      })
      .catch((error) => setState({ isLoading: false, error }))
  }, [selectedCurrency, token])

  function getRates() {
    return window
      .fetch(`https://v6.exchangerate-api.com/v6/${token}/latest/${selectedCurrency}`)
      .then((response) => response.json())
  }

  function composeRates(data) {
    const { conversion_rates: conversionRates } = data

    return currencies
      .filter((currency) => currency !== selectedCurrency)
      .map((currency) => {
        return { currency, value: conversionRates[currency] }
      })
  }

  const { isLoading, rates, error } = state

  if (isLoading) {
    return (
      <Center>
        <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
      </Center>
    )
  }

  if (error) {
    throw error
  }

  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>Flag</Th>
          <Th>Currency</Th>
          <Th isNumeric>Value</Th>
        </Tr>
      </Thead>
      <Tbody>
        {rates.map(({ currency, value }) => {
          return (
            <Tr key={currency}>
              <Td>
                <div className={`currency-flag currency-flag-${currency.toLowerCase()}`}></div>
              </Td>
              <Td>{currency}</Td>
              <Td isNumeric>{value}</Td>
            </Tr>
          )
        })}
      </Tbody>
    </Table>
  )
}

export default Rates
