import {
  Button,
  HStack,
  Heading,
  IconButton,
  List,
  ListItem,
  VStack,
} from '@chakra-ui/react';
import { FC } from 'react';
import {
  FiTrash,
  FiUserCheck,
  FiUserMinus,
  FiUserPlus,
  FiUserX,
} from 'react-icons/fi';
import { Navigate, useParams } from 'react-router-dom';
import { ConstructionManager } from '../../domain/buildings/ConstructionManager';
import { isCountingHouse } from '../../domain/buildings/counting-house';
import { PGrainFarm } from '../../domain/buildings/grain-farm';
import { isShipyard } from '../../domain/buildings/shipyard';
import { hasProductionSystem } from '../../domain/buildings/with-production-system.mixin';
import { MasterBuilder } from '../../domain/master-builder';
import SpeedSettings from '../common/SpeedSettings';
import ToWorldmapButton from '../common/ToWorldmapButton';
import { useCity, useWorld } from '../general/GameProvider';
import { BuildShipButton } from './BuildShipButton';
import { CountingHouseTradeButton } from './CountingHouseTradeButton';
import { Port } from './Port';
import { CitizenDetails } from './CitizenDetails';
import DetailsPage from '../common/DetailsPage';

export const CityDetails: FC = () => {
  const world = useWorld();
  const { id } = useParams<{ id: string }>();
  const city = useCity(id);

  if (!city) return <Navigate to="/" />;

  const player = world.player;
  const playerTreasury = player.treasury;
  const buildings = city.buildingsList;

  const canBuild = (buildingType: string) => {
    const constructionManager = new ConstructionManager({
      city,
    });
    const masterBuilder = new MasterBuilder({
      city,
      merchant: player,
      constructionManager,
    });
    return masterBuilder.canBuild(buildingType);
  };
  const build = (buildingType: string) => {
    const constructionResourceChecker = new ConstructionManager({
      city,
    });
    const masterBuilder = new MasterBuilder({
      city,
      merchant: player,
      constructionManager: constructionResourceChecker,
    });
    masterBuilder.build(buildingType);
  };

  return (
    <DetailsPage>
      <ToWorldmapButton />
      <SpeedSettings />

      <HStack align={'flex-start'} justify={'space-between'} gap={20}>
        <CitizenDetails city={city} />

        <VStack align="flex-end">
          <Heading as="h2">Player</Heading>
          <List>
            <ListItem>{playerTreasury.balance} Gold</ListItem>
          </List>
        </VStack>
      </HStack>

      <Port city={city} />
      <Heading as="h2">Buildings</Heading>

      <Button
        onClick={() => build('countingHouse')}
        isDisabled={!canBuild('countingHouse')}
      >
        Build Counting House
      </Button>
      <Button
        onClick={() => build('woodcutter')}
        isDisabled={!canBuild('woodcutter')}
      >
        Build woodcutter
      </Button>
      <Button
        onClick={() => build('grainFarm')}
        isDisabled={!canBuild('grainFarm')}
      >
        Build grain farm
      </Button>
      <Button
        onClick={() => build('brewery')}
        isDisabled={!canBuild('brewery')}
      >
        Build brewery
      </Button>
      <List>
        {buildings.map((building) => (
          <ListItem display={'flex'} gap={10} key={building.id}>
            {building.owner}'s {building.id}:{' '}
            {hasProductionSystem(building) && (
              <>
                {building.productionSystem.workforce.workers} workers of{' '}
                {(building as PGrainFarm).productionSystem.desiredWorkers}{' '}
                desired
                <IconButton
                  color="red.500"
                  icon={<FiUserX />}
                  aria-label="Fire all workers"
                  onClick={() => {
                    (building as PGrainFarm).setDesiredWorkers(0);
                  }}
                />
                <IconButton
                  color="red.300"
                  icon={<FiUserMinus />}
                  aria-label="Fire one worker"
                  onClick={() => {
                    (building as PGrainFarm).decrementDesiredWorkers(5);
                  }}
                />
                <IconButton
                  color="green.300"
                  icon={<FiUserPlus />}
                  aria-label="Add one workers"
                  onClick={() => {
                    (building as PGrainFarm).incrementDesiredWorkers(5);
                  }}
                />
                <IconButton
                  color="green.500"
                  icon={<FiUserCheck />}
                  aria-label="Max workers"
                  onClick={() => {
                    (building as PGrainFarm).setDesiredWorkers(100);
                  }}
                />
              </>
            )}
            <IconButton
              colorScheme="red"
              icon={<FiTrash />}
              aria-label="Destroy building"
              onClick={() => {
                city.destroyBuilding(building.id);
              }}
            />
            {isCountingHouse(building) && (
              <CountingHouseTradeButton city={city} building={building} />
            )}
            {isShipyard(building) && (
              <BuildShipButton
                city={city}
                player={player}
                building={building}
              />
            )}
          </ListItem>
        ))}
      </List>
    </DetailsPage>
  );
};

export default CityDetails;
