import {
  Button,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tooltip,
  Tr,
} from '@chakra-ui/react';
import { FC, useEffect } from 'react';
import { CountingHouse } from '../../domain/buildings/counting-house';
import { City } from '../../domain/city';
import { Convoy } from '../../domain/convoy';

export const TradingPostTable: FC<{
  city: City;
  merchant: Convoy | CountingHouse;
  amountTraded: number;
}> = ({ city, merchant, amountTraded }) => {
  const { tradingPost } = city;
  const wares = city.storage.wares;
  useEffect(() => {
    tradingPost.setMerchant(merchant);
  }, []);
  const average = (a: number) => Math.round(a / amountTraded);
  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Goods</Th>
          <Th>Town</Th>
          <Th>⌀ Buy</Th>
          <Th>⌀ Sell</Th>
          <Th>Ship</Th>
        </Tr>
      </Thead>
      <Tbody>
        {Object.keys(wares).map((ware) => (
          <Tr key={ware}>
            <Td>{ware}</Td>
            <Td>{city.storage.getStock(ware)}</Td>
            <Td>
              <Tooltip
                label={tradingPost.getQuoteForSellingToMerchant(
                  ware,
                  amountTraded
                )}
              >
                <Button
                  onClick={() => {
                    tradingPost.sellToMerchant(ware, amountTraded);
                  }}
                  // FIXME: bad UX because you cant just select 50 and then buy the remaining 20 from the city
                  isDisabled={
                    !tradingPost.canSellToMerchant(ware, amountTraded)
                  }
                  width={40}
                >
                  {average(
                    tradingPost.getQuoteForSellingToMerchant(ware, amountTraded)
                  )}
                </Button>
              </Tooltip>
            </Td>
            <Td>
              <Tooltip
                placement="top"
                openDelay={1}
                closeDelay={1}
                label={tradingPost.getQuoteForBuyingFromMerchant(
                  ware,
                  amountTraded
                )}
              >
                <Button
                  onClick={() => {
                    tradingPost.buyFromMerchant(ware, amountTraded);
                  }}
                  isDisabled={
                    !tradingPost.canBuyFromMerchant(ware, amountTraded)
                  }
                  width={40}
                >
                  {average(
                    tradingPost.getQuoteForBuyingFromMerchant(
                      ware,
                      amountTraded
                    )
                  )}
                </Button>
              </Tooltip>
            </Td>
            <Td>{merchant.storage.getStock(ware)}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};
