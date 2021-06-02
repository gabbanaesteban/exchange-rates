import React, { useEffect, useState } from "react"
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react"

function Rates({ currencies, selectedCurrency, token, ...props }) {
  const [rates, setRates] = useState([])

  useEffect(() => {
    if (!selectedCurrency || !token) {
      return
    }

    getRates().then(({ conversion_rates: conversionRates }) => {
      const rates = currencies
        .filter((currency) => currency !== selectedCurrency)
        .map((currency) => {
          return { currency, value: conversionRates[currency] }
        })
      setRates(rates)
    })
  }, [selectedCurrency, token])

  function getRates() {
    return window
      .fetch(
        `https://v6.exchangerate-api.com/v6/${token}/latest/${selectedCurrency}`
      )
      .then((response) => response.json())
  }

  return (
    <Table variant="simple" mb={3}>
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
                <div
                  className={`currency-flag currency-flag-${currency.toLowerCase()}`}
                ></div>
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
