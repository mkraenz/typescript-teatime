import { Heading, Table } from '@chakra-ui/react';
import { FC } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import ToWorldmapButton from './common/ToWorldmapButton';
import { useConvoy } from './general/GameProvider';
import DetailsPage from './common/DetailsPage';

const ConvoyDetails: FC = () => {
  const { id } = useParams<{ id: string }>();
  const convoy = useConvoy(id);

  if (!id || !convoy) return <Navigate to="/" />;

  return (
    <DetailsPage>
      <ToWorldmapButton />
      <Heading>Convoy "{convoy.label}"</Heading>
      <Heading as="h2" size="md">
        Storage
      </Heading>

      <Table>
        <thead>
          <tr>
            <th>Good</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {convoy.storage.waresList
            .filter((x) => x.amount !== 0)
            .map(({ amount, type }) => (
              <tr key={type}>
                <td>{type}</td>
                <td>{amount}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </DetailsPage>
  );
};

export default ConvoyDetails;
